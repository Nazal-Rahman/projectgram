import React from 'react';
import { User } from 'lucide-react';

export default function TeamTab() {
  const team: any[] = [];

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold">Project Team</h2>
        <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition">Add Member</button>
      </div>
      <div className="divide-y">
        {team.map((member, i) => (
          <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                {member.name[0]}
              </div>
              <div>
                <p className="font-bold">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-muted rounded-full font-medium">{member.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
