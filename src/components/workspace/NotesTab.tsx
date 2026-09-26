import React from 'react';
import { FileText, Plus } from 'lucide-react';

export default function NotesTab() {
  const notes = [
    { title: 'ESP32 Power Supply Notes', date: 'Sept 12, 2026', preview: 'Objective: Design stable 5V supply. Components: ESP32, Buck Converter...' },
    { title: 'Sensor Placement Strategy', date: 'Sept 14, 2026', preview: 'We need to place the HC-SR04 at least 15cm away from the wall to avoid multipath...' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Technical Notes</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition">
          <Plus size={18} /> New Note
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note, i) => (
          <div key={i} className="p-5 border rounded-xl bg-card hover:border-primary/50 transition cursor-pointer group shadow-sm hover:shadow">
            <div className="flex items-start gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{note.title}</h3>
                <p className="text-xs text-muted-foreground">{note.date}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{note.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
