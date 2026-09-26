import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { askGrok } from '../../lib/grok';

export default function AISearchTab() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulated project context that would normally be fetched from Firebase
  const projectContext = `
    Project: Energy Optimization System (V2.1 PROTOTYPE)
    Budget: ₹6,000 (Spent: ₹4,400, Remaining: ₹1,600)
    Team: Naseeb Rahman (Lead), Rahul (Embedded Engineer), Arun (AI Engineer)
    Milestones: Research & Requirements (Completed), Initial Prototype (Completed), PCB Design V1 (In Progress), Testing & Validation (Pending)
    Components Used: ESP32-WROOM-32D, HC-SR04 Ultrasonic Sensor, LM2596 Buck Converter, 10K Resistors.
    Notes: ESP32 Power Supply Note (Objective: Design stable 5V supply). Sensor Placement (Place HC-SR04 at least 15cm from wall).
    Recent Experiments: Experiment #08 tested ultrasonic sensor accuracy (Result: SUCCESS, 1% error). Experiment #07 tested buck converter thermals (Result: FAILED, overheats at 2A load).
    Recent Builds: Build #12 (Testing, new PCB mounted, enclosure fitted). Build #11 (Completed, first assembly).
    Cost Transactions: PCB Manufacturing (₹900, JLCPCB), Components (₹2400, Robu).
  `;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    
    try {
      const answer = await askGrok(query, projectContext);
      setResponse(answer);
    } catch (error: any) {
      console.error(error);
      setResponse(`⚠️ API Connection Failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden flex flex-col h-[500px]">
      <div className="p-6 border-b bg-primary/5 flex items-center gap-3">
        <div className="p-2 bg-primary/10 text-primary rounded-lg"><Sparkles size={24} /></div>
        <div>
          <h2 className="text-xl font-bold">Grok AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Powered by X.AI. Ask questions about notes, experiments, components, or project status.</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto bg-muted/10 space-y-6">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <Bot size={18} />
          </div>
          <div className="bg-card p-4 rounded-xl rounded-tl-none border shadow-sm max-w-2xl text-sm leading-relaxed">
            Hello! I am Grok. I have analyzed this project's database (Notes, BOM, Tasks, Experiments, Costs). What would you like to know?
            <div className="mt-3 space-y-2">
              <button onClick={() => setQuery("What is the current status of the project?")} className="block text-primary hover:underline font-medium text-xs">"What is the current status of the project?"</button>
              <button onClick={() => setQuery("Why did experiment 07 fail?")} className="block text-primary hover:underline font-medium text-xs">"Why did experiment 07 fail?"</button>
              <button onClick={() => setQuery("How much budget do we have left?")} className="block text-primary hover:underline font-medium text-xs">"How much budget do we have left?"</button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Loader2 size={18} className="animate-spin" />
            </div>
            <div className="bg-card p-4 rounded-xl rounded-tl-none border shadow-sm flex items-center gap-2 text-sm text-muted-foreground">
              Analyzing project documents...
            </div>
          </div>
        )}

        {response && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div className="bg-card p-4 rounded-xl rounded-tl-none border shadow-sm max-w-3xl text-sm leading-relaxed whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-card border-t">
        <form onSubmit={handleAsk} className="flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about the project..." 
            className="flex-1 px-4 py-2.5 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading || !query.trim()}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Send size={18} /> Ask AI
          </button>
        </form>
      </div>
    </div>
  );
}
