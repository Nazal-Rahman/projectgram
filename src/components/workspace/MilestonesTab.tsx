import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export default function MilestonesTab() {
  const milestones: any[] = [];

  return (
    <div className="border rounded-xl bg-card shadow-sm p-6">
      <h2 className="text-xl font-bold mb-6">Project Milestones</h2>
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {milestones.map((m, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-muted text-muted-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {m.status === 'COMPLETED' ? <CheckCircle size={20} className="text-primary" /> : <Circle size={20} />}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold">{m.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium 
                  ${m.status === 'COMPLETED' ? 'bg-primary/10 text-primary' : m.status === 'IN PROGRESS' ? 'bg-orange-500/10 text-orange-500' : 'bg-muted'}`}>
                  {m.status}
                </span>
              </div>
              <time className="text-sm text-muted-foreground">{m.date}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
