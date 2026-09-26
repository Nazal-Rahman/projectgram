import React from 'react';
import { Hammer } from 'lucide-react';

export default function BuildLogsTab() {
  const logs = [
    { id: '#12', version: 'V2.1', date: 'Sept 26, 2026', status: 'Testing', changes: ['New PCB mounted', 'New enclosure fitted', 'Improved wiring routing'] },
    { id: '#11', version: 'V2.0', date: 'Sept 15, 2026', status: 'Completed', changes: ['First assembly of V2 PCB', 'Basic power on test passed'] },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2"><Hammer className="text-primary"/> Physical Build Logs</h2>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition text-sm font-medium">
          New Build
        </button>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {logs.map((log, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-xs">
              {log.version}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border bg-card shadow-sm hover:shadow transition">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <h3 className="font-bold">BUILD {log.id}</h3>
                <span className="text-xs font-medium text-muted-foreground">{log.date}</span>
              </div>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground mb-4">
                {log.changes.map((change, j) => <li key={j}>{change}</li>)}
              </ul>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-muted rounded font-medium">Status: {log.status}</span>
                <button className="text-xs text-primary hover:underline font-medium">View Media</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
