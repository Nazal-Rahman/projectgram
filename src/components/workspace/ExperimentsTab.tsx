import React from 'react';
import { FlaskConical } from 'lucide-react';

export default function ExperimentsTab() {
  const experiments: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2"><FlaskConical className="text-primary"/> Experiment Logs</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition text-sm font-medium">
          Log Experiment
        </button>
      </div>
      
      <div className="space-y-4">
        {experiments.map((exp, i) => (
          <div key={i} className="border rounded-xl bg-card p-6 shadow-sm hover:border-primary/40 transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">EXPERIMENT {exp.id}</span>
                <h3 className="font-bold text-lg mt-1">{exp.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{exp.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${exp.status === 'SUCCESS' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                {exp.status}
              </span>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <span className="text-xs font-bold text-muted-foreground uppercase">Conclusion</span>
              <p className="text-sm mt-1">{exp.conclusion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
