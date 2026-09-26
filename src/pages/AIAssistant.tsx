import React, { useState } from 'react';
import { Sparkles, Send, Loader2, Bot } from 'lucide-react';
import { askGrok } from '../lib/grok';

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulated global workspace context
  const workspaceContext = `
    Global Workspace: Projectgram Main Headquarters
    Active Projects: Energy Optimization System (V2.1), Smart Home Dashboard, AI Drone Nav.
    Team Members: Nazal Rahman (Lead), Rahul (Admin/Hardware), Arun (AI), Vivek (Mechanical).
    Inventory Status: ESP32 stock is LOW (2 remaining). Need to order more 10K resistors.
    Recent Activity: Nazal uploaded schematic_v3.pdf to Energy project. Rahul completed PCB layout.
  `;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    
    try {
      const answer = await askGrok(query, workspaceContext);
      setResponse(answer);
    } catch (error: any) {
      console.error(error);
      setResponse(`⚠️ API Connection Failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Sparkles className="text-primary" /> Global Grok Assistant
        </h1>
        <p className="text-muted-foreground mt-2">Powered by X.AI. Ask anything about your workspace, projects, or team.</p>
      </div>

      <div className="border rounded-xl bg-card shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto bg-muted/10 space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/20">
              <Bot size={24} />
            </div>
            <div className="bg-card p-5 rounded-2xl rounded-tl-none border shadow-sm max-w-2xl text-sm leading-relaxed">
              <p className="font-medium text-base mb-2">Hello! I am Grok, your Engineering Assistant.</p>
              I have scanned your entire workspace database (Projects, Inventory, Team Activity). What would you like to know?
              
              <div className="mt-4 space-y-2">
                <button onClick={() => setQuery("Give me a summary of all active projects.")} className="block text-primary hover:bg-primary/5 px-3 py-2 rounded-lg font-medium text-xs border border-primary/20 transition w-full text-left">
                  "Give me a summary of all active projects."
                </button>
                <button onClick={() => setQuery("What is our current inventory status for the ESP32?")} className="block text-primary hover:bg-primary/5 px-3 py-2 rounded-lg font-medium text-xs border border-primary/20 transition w-full text-left">
                  "What is our current inventory status for the ESP32?"
                </button>
                <button onClick={() => setQuery("What has the team been working on recently?")} className="block text-primary hover:bg-primary/5 px-3 py-2 rounded-lg font-medium text-xs border border-primary/20 transition w-full text-left">
                  "What has the team been working on recently?"
                </button>
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Loader2 size={24} className="animate-spin" />
              </div>
              <div className="bg-card p-4 rounded-2xl rounded-tl-none border shadow-sm flex items-center gap-2 text-sm text-muted-foreground font-medium">
                Gemini is thinking...
              </div>
            </div>
          )}

          {response && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 shadow-sm border border-primary/20">
                <Sparkles size={24} />
              </div>
              <div className="bg-card p-5 rounded-2xl rounded-tl-none border shadow-sm max-w-3xl text-sm leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-card border-t">
          <form onSubmit={handleAsk} className="flex gap-3">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Message Gemini Assistant..." 
              className="flex-1 px-5 py-3 bg-background border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-sm font-bold hover:bg-primary/90 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Send size={18} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
