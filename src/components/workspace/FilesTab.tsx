import React, { useState, useRef } from 'react';
import { File, Image as ImageIcon, FileArchive, Download, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '../../lib/cloudinary';

export default function FilesTab() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([
    { name: 'schematic_v3.pdf', type: 'pdf', size: '2.4 MB', date: 'Today', url: '#' },
    { name: 'enclosure_v2.stl', type: '3d', size: '14 MB', date: 'Yesterday', url: '#' },
    { name: 'board_render.png', type: 'image', size: '4.1 MB', date: 'Sept 20', url: '#' },
    { name: 'gerber_files.zip', type: 'zip', size: '8.5 MB', date: 'Sept 15', url: '#' },
  ]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      
      // Determine type
      let type = 'file';
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.name.endsWith('.zip')) type = 'zip';
      else if (file.type === 'application/pdf') type = 'pdf';

      setFiles([{
        name: file.name,
        type,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        date: 'Just now',
        url
      }, ...files]);

    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Ensure you have created an 'Unsigned Upload Preset' named 'projectgram_preset' in your Cloudinary Dashboard under Settings -> Upload.");
    } finally {
      setUploading(false);
    }
  };

  const getIcon = (type: string) => {
    if (type === 'image') return <ImageIcon size={24} className="text-blue-500" />;
    if (type === 'zip') return <FileArchive size={24} className="text-orange-500" />;
    return <File size={24} className="text-red-500" />;
  };

  return (
    <div className="border rounded-xl bg-card shadow-sm">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Project Files</h2>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 border rounded-lg hover:bg-muted font-medium transition text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {uploading ? <><Loader2 size={16} className="animate-spin"/> Uploading...</> : 'Upload File'}
        </button>
      </div>
      <div className="divide-y">
        {files.map((file, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition group">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-muted rounded-lg">
                {getIcon(file.type)}
              </div>
              <div>
                <a href={file.url !== '#' ? file.url : undefined} target="_blank" rel="noreferrer" className={`font-semibold text-sm ${file.url !== '#' ? 'text-primary hover:underline' : ''}`}>
                  {file.name}
                </a>
                <p className="text-xs text-muted-foreground">{file.size} • Uploaded {file.date}</p>
              </div>
            </div>
            <a href={file.url !== '#' ? file.url : '#'} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition opacity-0 group-hover:opacity-100">
              <Download size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
