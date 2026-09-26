import { Users, Mail, Phone, Code, Briefcase } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const MOCK_DATA: any[] = [];

export default function Members() {
  const { user } = useAuthStore();
  const isAdmin = user?.email === 'admin@projectgram.local' || user?.email?.includes('admin');

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="border-b pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Team Directory</h1>
        <p className="text-muted-foreground mt-2">
          {isAdmin 
            ? "As an admin, you can view the complete profiles and contact information of all registered members." 
            : "View the core team members collaborating in this workspace."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_DATA.map(member => (
          <div key={member.id} className="border bg-card rounded-xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition">
            <div className="h-24 bg-gradient-to-r from-muted to-muted/50 border-b relative">
              <div className={`absolute -bottom-10 left-6 w-20 h-20 rounded-xl bg-gradient-to-br ${member.color} text-white flex items-center justify-center text-3xl font-bold border-4 border-card shadow-sm`}>
                {member.avatar}
              </div>
            </div>
            
            <div className="pt-12 p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{member.name}</h2>
                  <p className="text-sm font-medium text-primary">@{member.nickname}</p>
                </div>
                <div className="px-2.5 py-1 bg-muted text-xs font-semibold rounded-md">
                  {member.role}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
                {member.bio}
              </p>

              <div className="space-y-3 mb-6 pb-6 border-b text-sm">
                <div className="flex items-center gap-3 text-foreground/80">
                  <Mail size={16} className="text-muted-foreground" />
                  <a href={`mailto:${member.email}`} className="hover:text-primary transition">{member.email}</a>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Phone size={16} className="text-muted-foreground" />
                  <a href={`tel:${member.phone}`} className="hover:text-primary transition">{member.phone}</a>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Briefcase size={16} className="text-muted-foreground" />
                  <span>{member.role}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-3">
                  <Code size={14} /> Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill: any) => (
                    <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
