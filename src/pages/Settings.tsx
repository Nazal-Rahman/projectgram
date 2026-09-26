import { useState } from 'react';
import { AlertTriangle, Trash2, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [resetPhrase, setResetPhrase] = useState('');
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleFactoryReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetPhrase !== 'DELETE EVERYTHING') return;
    
    setResetting(true);
    
    // Simulate reset delay
    setTimeout(() => {
      setResetting(false);
      setResetDone(true);
      // In a real app, this is where you would call the backend to wipe the db
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">Manage application-wide preferences and danger zones.</p>
      </div>

      <div className="border border-red-200 dark:border-red-900 rounded-xl bg-red-50/50 dark:bg-red-950/20 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-red-200 dark:border-red-900 flex items-center gap-3 bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400">
          <AlertTriangle size={24} />
          <h2 className="text-xl font-bold">Danger Zone: Factory Reset</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="font-medium">Factory reset is an extremely destructive operation.</p>
          
          <div className="p-4 bg-background border rounded-lg text-sm space-y-2">
            <p className="font-bold text-red-500">This will permanently delete:</p>
            <ul className="list-disc list-inside text-muted-foreground grid grid-cols-2 gap-2 mt-2">
              <li>All Users & Members</li>
              <li>All Projects</li>
              <li>All Messages</li>
              <li>All Files & Media</li>
              <li>All Communities</li>
              <li>System Settings</li>
              <li>Component Inventory</li>
              <li>Experiment Logs</li>
              <li>Cost Tracking data</li>
            </ul>
          </div>

          <p className="text-sm font-semibold text-muted-foreground">It is highly recommended to perform a backup before proceeding.</p>

          {!resetDone ? (
            <form onSubmit={handleFactoryReset} className="mt-6 border-t pt-6">
              <label className="block text-sm font-bold mb-2">
                To confirm, type <span className="select-none bg-red-100 text-red-600 dark:bg-red-900/50 px-1 py-0.5 rounded font-mono">DELETE EVERYTHING</span> below:
              </label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={resetPhrase}
                  onChange={(e) => setResetPhrase(e.target.value)}
                  placeholder="Type the confirmation phrase" 
                  className="flex-1 py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all font-mono uppercase"
                  disabled={resetting}
                />
                <button 
                  type="submit" 
                  disabled={resetPhrase !== 'DELETE EVERYTHING' || resetting}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md transition disabled:opacity-50 disabled:hover:bg-red-500 flex items-center gap-2 shadow-sm"
                >
                  {resetting ? 'Erasing Data...' : <><Trash2 size={18}/> Factory Reset</>}
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 border-t pt-6 flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg text-green-600">
              <CheckCircle size={48} className="mb-4" />
              <h3 className="text-xl font-bold">System Reset Complete</h3>
              <p className="text-sm mt-2 text-center text-green-600/80">All data has been successfully wiped. The system is back to its factory state.</p>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-xl bg-card overflow-hidden shadow-sm mt-8">
        <div className="p-6 border-b bg-muted/30">
          <h2 className="text-xl font-bold">About the Developer</h2>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="inline-block text-left bg-background p-6 rounded-xl border shadow-sm w-full max-w-lg">
            <p className="font-bold text-lg mb-2">NAZAL RHAMAN C.T</p>
            <div className="space-y-2 text-muted-foreground mb-6">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Email:</span> 
                <a href="mailto:nazalrahman14@gmail.com" className="hover:text-primary transition">nazalrahman14@gmail.com</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Call / WhatsApp:</span> 
                <a href="tel:+919207842646" className="hover:text-primary transition">+91 9207842646</a>
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
              <p className="text-sm text-foreground/90 font-medium leading-relaxed">
                Notice: If you have any suggestions for new features, or if you encounter any errors or bugs while using the application, please do not hesitate to contact the developer using the details provided above. Your feedback is highly appreciated!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
