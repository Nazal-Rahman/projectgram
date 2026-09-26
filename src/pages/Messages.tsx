import { useState, useRef } from 'react';
import { Send, Paperclip, Hash, User, Trash2, Image, FileText, GitBranch, Video, X, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';
import { useAuthStore } from '../store/authStore';

const CHANNELS: any[] = [];
const DIRECT_MESSAGES: any[] = [];
type Message = { id: string; sender: string; time: string; text: string; attachment?: { type: string, url: string, name: string } };
const MOCK_DATA: Message[] = [];

export default function Messages() {
  const { user } = useAuthStore();
  const isAdmin = user?.email === 'admin@projectgram.local' || user?.email?.includes('admin');
  
  // Admins see everyone. Regular users only see Admins.
  const visibleDMs = isAdmin ? DIRECT_MESSAGES : DIRECT_MESSAGES.filter(dm => dm.name.includes('(Admin)'));

  const [activeChat, setActiveChat] = useState('general');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>(MOCK_DATA);
  const [showAttachments, setShowAttachments] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingType, setPendingType] = useState<string | null>(null);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    
    const newMsg: Message = { 
      id: Date.now().toString(), 
      sender: 'You', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      text: inputText 
    };

    setMessages([...messages, newMsg]);
    setInputText('');
    setShowAttachments(false);
  };

  const triggerUpload = (type: string) => {
    setPendingType(type);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingType) return;

    setUploading(true);
    setShowAttachments(false);
    
    try {
      const url = await uploadToCloudinary(file);
      
      const newMsg: Message = { 
        id: Date.now().toString(), 
        sender: 'You', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        text: inputText || `Sent a ${pendingType}`,
        attachment: {
          type: pendingType,
          url,
          name: file.name
        }
      };

      setMessages([...messages, newMsg]);
      setInputText('');
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Ensure you have created an 'Unsigned Upload Preset' named 'projectgram_preset' in your Cloudinary Dashboard under Settings -> Upload.");
    } finally {
      setUploading(false);
      setPendingType(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex border rounded-xl shadow-sm bg-card overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b font-bold tracking-tight">Communications</div>
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          
          <div>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Projects & Communities</h3>
            <ul className="space-y-0.5">
              {CHANNELS.map(c => (
                <li key={c.id}>
                  <button 
                    onClick={() => setActiveChat(c.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeChat === c.name ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'}`}
                  >
                    <Hash size={14} /> {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2">Direct Messages</h3>
            <ul className="space-y-0.5">
              {visibleDMs.map(dm => (
                <li key={dm.id}>
                  <button 
                    onClick={() => setActiveChat(dm.name)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${activeChat === dm.name ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'}`}
                  >
                    <User size={14} /> {dm.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative bg-background">
        <div className="h-14 border-b flex items-center px-6 font-semibold shadow-sm bg-card/80 backdrop-blur z-10">
          {activeChat.includes('(') ? <User size={18} className="mr-2 text-muted-foreground" /> : <Hash size={18} className="mr-2 text-muted-foreground" />}
          {activeChat}
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className="group flex gap-4 hover:bg-muted/30 p-2 -mx-2 rounded-lg transition">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                {msg.sender[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm mt-1 text-foreground/90">{msg.text}</p>
                
                {msg.attachment && (
                  <a href={msg.attachment.url !== '#' ? msg.attachment.url : undefined} target="_blank" rel="noreferrer" className="mt-2 p-3 border rounded-lg bg-card max-w-sm flex items-center gap-3 hover:border-primary/50 transition cursor-pointer block">
                    <div className="p-2 bg-primary/10 rounded-md text-primary shrink-0">
                      {msg.attachment.type === 'image' && <Image size={20} />}
                      {msg.attachment.type === 'file' && <FileText size={20} />}
                      {msg.attachment.type === 'github' && <GitBranch size={20} />}
                      {msg.attachment.type === 'video' && <Video size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{msg.attachment.name}</p>
                      <p className="text-xs text-muted-foreground uppercase">{msg.attachment.type}</p>
                    </div>
                  </a>
                )}
              </div>
              
              {/* Delete Button (visible on hover) */}
              <button 
                onClick={() => deleteMessage(msg.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition shrink-0 self-start"
                title="Delete message"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {uploading && (
             <div className="flex gap-4 p-2 -mx-2">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Loader2 size={18} className="animate-spin" /></div>
               <div><p className="text-sm font-semibold">Uploading {pendingType}...</p></div>
             </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />

        {/* Attachment Menu Popup */}
        {showAttachments && (
          <div className="absolute bottom-20 left-6 bg-card border shadow-lg rounded-xl p-2 flex flex-col gap-1 w-48 z-20">
            <button onClick={() => triggerUpload('image')} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"><Image size={16}/> Upload Image</button>
            <button onClick={() => triggerUpload('video')} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"><Video size={16}/> Upload Video</button>
            <button onClick={() => triggerUpload('file')} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"><FileText size={16}/> Share Document</button>
            <button onClick={() => {
               // Mock Github repo link for now since it doesn't need file upload
               handleSend();
               setMessages(m => [...m, { id: Date.now().toString(), sender: 'You', time: 'Just now', text: 'Linked a repository', attachment: { type: 'github', url: 'https://github.com/example/repo', name: 'example/repo' } }]);
               setShowAttachments(false);
            }} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md"><GitBranch size={16}/> Link Repository</button>
          </div>
        )}

        <div className="p-4 bg-card border-t z-10 relative">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => setShowAttachments(!showAttachments)}
              disabled={uploading}
              className={`p-2.5 rounded-full transition disabled:opacity-50 ${showAttachments ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
            >
              {showAttachments ? <X size={20} /> : <Paperclip size={20} />}
            </button>
            <input 
              type="text" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Message ${activeChat}...`} 
              className="flex-1 py-2.5 px-4 border rounded-full bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all shadow-sm"
              disabled={uploading}
            />
            <button type="submit" disabled={uploading || (!inputText.trim())} className="p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition shadow-sm disabled:opacity-50">
              <Send size={18} className="ml-0.5" />
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
