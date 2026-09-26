import { useState, useRef } from 'react';
import { User, Mail, Phone, Code, Save, Camera, Loader2 } from 'lucide-react';
import { uploadToCloudinary } from '../lib/cloudinary';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({
    name: 'Naseeb Rahman',
    nickname: 'Nazal',
    email: 'admin@projectgram.local',
    phone: '+91 9876543210',
    bio: 'Embedded Systems Engineer passionate about IoT and hardware design.',
    skills: 'C++, Python, PCB Design, React',
    avatarUrl: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setProfile({ ...profile, avatarUrl: url });
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Ensure you have created an 'Unsigned Upload Preset' named 'projectgram_preset' in Cloudinary.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg shadow-sm font-medium transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        
        {/* Banner and Avatar Area */}
        <div className="h-32 bg-gradient-to-r from-primary/80 to-accent/80 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-full border-4 border-card bg-muted flex items-center justify-center relative overflow-hidden group">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-muted-foreground">N</span>
              )}
              
              {isEditing && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition"
                >
                  {uploading ? <Loader2 className="text-white animate-spin" size={24} /> : <Camera className="text-white" size={24} />}
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>
        </div>

        <div className="pt-16 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User size={16}/> Full Name
                </label>
                {isEditing ? (
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm" />
                ) : (
                  <p className="font-semibold text-lg">{profile.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Nickname</label>
                {isEditing ? (
                  <input type="text" value={profile.nickname} onChange={e => setProfile({...profile, nickname: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm" />
                ) : (
                  <p className="font-medium text-lg">{profile.nickname}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Mail size={16}/> Email Address
                </label>
                {isEditing ? (
                  <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm" />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Phone size={16}/> Phone / WhatsApp
                </label>
                {isEditing ? (
                  <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm" />
                ) : (
                  <p className="text-foreground">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2 border-t pt-6">
              <label className="text-sm font-medium text-muted-foreground">Bio</label>
              {isEditing ? (
                <textarea rows={3} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm" />
              ) : (
                <p className="text-foreground">{profile.bio}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Code size={16}/> Skills
              </label>
              {isEditing ? (
                <input type="text" value={profile.skills} onChange={e => setProfile({...profile, skills: e.target.value})} className="w-full p-2.5 border rounded-lg bg-background shadow-sm placeholder:text-sm" placeholder="Comma separated skills" />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.split(',').map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{skill.trim()}</span>
                  ))}
                </div>
              )}
            </div>

            {isEditing && (
              <div className="pt-4 border-t flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded-lg font-medium hover:bg-muted transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium shadow-sm hover:bg-primary/90 flex items-center gap-2 transition">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
