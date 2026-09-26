import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home as HomeIcon, Briefcase, Box, MessageSquare, CheckSquare, LogOut, Menu, Monitor, Smartphone, Tablet, Settings as SettingsIcon, Users, Wrench, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectWorkspace from './pages/ProjectWorkspace';
import Inventory from './pages/Inventory';
import Messages from './pages/Messages';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Members from './pages/Members';
import Tools from './pages/Tools';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';

function App() {
  const [deviceExperience, setDeviceExperience] = useState<string | null>(localStorage.getItem('deviceExperience'));
  const initializeAuth = useAuthStore(state => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleSelectDevice = (device: string) => {
    setDeviceExperience(device);
    localStorage.setItem('deviceExperience', device);
  };

  return (
    <Router>
      {!deviceExperience && <DeviceSelector onSelect={handleSelectDevice} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/*" element={
          <ProtectedRoute>
            <AuthLayout deviceExperience={deviceExperience} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function DeviceSelector({ onSelect }: { onSelect: (device: string) => void }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border shadow-xl rounded-xl p-8 max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to Projectgram</h2>
        <p className="text-muted-foreground mb-8">How would you like to use the application? We will optimize the layout for your choice.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => onSelect('desktop')} className="p-6 border rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col items-center gap-4 group shadow-sm hover:shadow">
            <Monitor size={48} className="text-muted-foreground group-hover:text-primary transition" />
            <span className="font-semibold text-lg">Laptop / PC</span>
          </button>
          <button onClick={() => onSelect('tablet')} className="p-6 border rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col items-center gap-4 group shadow-sm hover:shadow">
            <Tablet size={48} className="text-muted-foreground group-hover:text-primary transition" />
            <span className="font-semibold text-lg">Tablet</span>
          </button>
          <button onClick={() => onSelect('mobile')} className="p-6 border rounded-xl hover:border-primary hover:bg-primary/5 transition flex flex-col items-center gap-4 group shadow-sm hover:shadow">
            <Smartphone size={48} className="text-muted-foreground group-hover:text-primary transition" />
            <span className="font-semibold text-lg">Phone</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function AuthLayout({ deviceExperience }: { deviceExperience: string | null }) {
  const isMobile = deviceExperience === 'mobile';
  const { logout } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans">
      {/* Sidebar - Hidden on mobile by default in this demo */}
      {!isMobile && (
        <aside className="w-64 border-r bg-card flex flex-col shadow-sm z-20">
          <div className="p-5 border-b">
            <h1 className="text-xl font-extrabold text-primary tracking-tight">Projectgram</h1>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link to="/app" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <HomeIcon size={20} /> <span>Dashboard</span>
            </Link>
            <Link to="/app/ai" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-bold transition-colors">
              <Sparkles size={20} /> <span>Grok AI</span>
            </Link>
            <Link to="/app/projects" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <Briefcase size={20} /> <span>Projects</span>
            </Link>
            <Link to="/app/tasks" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <CheckSquare size={20} /> <span>My Tasks</span>
            </Link>
            <Link to="/app/inventory" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <Box size={20} /> <span>Inventory</span>
            </Link>
            <Link to="/app/messages" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <MessageSquare size={20} /> <span>Messages</span>
            </Link>
            <div className="pt-4 pb-1">
              <p className="px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Team & Tools</p>
            </div>
            <Link to="/app/members" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <Users size={20} /> <span>Team Directory</span>
            </Link>
            <Link to="/app/tools" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <Wrench size={20} /> <span>Calculators</span>
            </Link>
          </nav>
          <div className="p-4 border-t space-y-1">
            <Link to="/app/settings" className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-muted font-medium transition-colors text-muted-foreground hover:text-foreground">
              <SettingsIcon size={20} /> <span>Settings</span>
            </Link>
            <button onClick={logout} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 font-medium transition-colors text-red-500 hover:text-red-600">
              <LogOut size={20} /> <span>Logout</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-muted/10">
        <header className="h-16 border-b flex items-center px-6 justify-between bg-card shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            {isMobile && <button className="p-2 hover:bg-muted rounded-md transition"><Menu /></button>}
            {isMobile && <h1 className="font-extrabold text-primary tracking-tight">Projectgram</h1>}
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <Link to="/app/profile" className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-sm hover:opacity-90 transition">
              N
            </Link>
          </div>
        </header>
        
        <div className="p-4 md:p-8 overflow-auto flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectWorkspace />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tools" element={<Tools />} />
          </Routes>
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <nav className="h-16 border-t bg-card flex justify-around items-center shrink-0">
            <Link to="/app" className="p-2 flex flex-col items-center text-muted-foreground"><HomeIcon size={20} /><span className="text-[10px]">Home</span></Link>
            <Link to="/app/projects" className="p-2 flex flex-col items-center text-muted-foreground"><Briefcase size={20} /><span className="text-[10px]">Projects</span></Link>
            <Link to="/app/inventory" className="p-2 flex flex-col items-center text-muted-foreground"><Box size={20} /><span className="text-[10px]">Inventory</span></Link>
            <Link to="/app/messages" className="p-2 flex flex-col items-center text-muted-foreground"><MessageSquare size={20} /><span className="text-[10px]">Messages</span></Link>
          </nav>
        )}
      </main>
    </div>
  );
}

// Public Pages
function Home() {
  const handleInstall = () => {
    alert("To install this app, click your browser's 'Install' icon in the address bar, or select 'Add to Home Screen' from your mobile browser menu.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center bg-card">
        <h1 className="text-2xl font-bold text-primary">Projectgram</h1>
        <nav className="space-x-4">
          <button onClick={handleInstall} className="px-4 py-2 border rounded-md font-medium text-sm hover:bg-accent transition hidden sm:inline-block">Install App</button>
          <Link to="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">Login</Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex items-center justify-center text-center p-6 py-20">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-extrabold tracking-tight mb-6">Build. Document. Collaborate. Remember.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              A private workspace for engineering projects, teams, experiments, files, builds and technical knowledge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/features" className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary/5 transition">Explore Features</Link>
              <button onClick={handleInstall} className="px-6 py-3 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary/5 transition">Install App</button>
              <Link to="/login" className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md shadow hover:bg-primary/90 transition">Login to Workspace</Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              * This is a private workspace. You must receive login credentials from the administrator to access the platform.
            </p>
          </div>
        </section>

        <section className="bg-card border-t py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 text-primary">About the Developer</h3>
            <div className="inline-block text-left bg-background p-6 rounded-xl border shadow-sm">
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
                <p className="text-sm text-foreground/90 font-medium text-center">
                  Notice: If you have any suggestions for new features, or if you encounter any errors or bugs while using the application, please do not hesitate to contact the developer using the details provided above. Your feedback is highly appreciated!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Features() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex items-center bg-card sticky top-0 z-10 shadow-sm">
        <Link to="/" className="text-primary hover:underline font-medium">&larr; Back to Home</Link>
      </header>
      <div className="p-8 space-y-12 max-w-5xl mx-auto pb-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight">Comprehensive Engineering Workflow</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Projectgram is a complete ecosystem designed specifically for hardware, software, and research teams. Below is a detailed explanation of every feature and mode available in the application.</p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-primary border-b pb-2">1. The Project Workspace</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Centralized Overview</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Everything starts at the Project Overview. It provides a birds-eye view of your project's current status, priority, overall progress, and upcoming deadlines. It acts as the command center for the entire team.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Kanban Task Management</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Organize your work visually with a built-in Kanban board. Move tasks seamlessly between "TO DO", "IN PROGRESS", and "DONE". Assign tasks to team members, set priorities, and attach relevant files directly to tasks.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Milestone Tracking</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Break massive engineering projects down into achievable milestones (e.g., Research, Prototype, PCB Layout, Manufacturing). Track the completion dates and status of each major phase visually.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Team & Permissions</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Manage your project team. Assign roles such as "Project Lead", "Embedded Engineer", or "AI Researcher". Strict security rules ensure that only authorized members can view or edit sensitive project data.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-primary border-b pb-2">2. Hardware & Manufacturing</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Global Component Inventory</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Maintain a shared database of all available physical components (Sensors, ICs, Microcontrollers). Track current stock levels, view low-stock warnings, and access manufacturer datasheets instantly.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">BOM (Bill of Materials)</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Build your BOM directly inside the project. Select parts from your global inventory, specify quantities, track supplier links, and let the system automatically calculate the total hardware cost for your prototype.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Experiment Logging</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Stop losing track of test results. Log every hardware or software experiment you run. Record your objective, input parameters, measurements, and a definitive conclusion (Pass/Fail) for future reference.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Physical Build Versions</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Hardware goes through iterations (V1.0, V2.1). Document every physical build, outlining exactly what changed (e.g., "New PCB fitted", "Swapped power supply"). Attach photos and videos of the physical result.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-primary border-b pb-2">3. Collaboration & Data</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Technical Messaging</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Communicate through Direct Messages, Project-specific channels, or general Communities. The chat supports rich media—upload images, share ZIP archives of Gerber files, or link GitHub repositories directly in the conversation.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">File & Media Management</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">A dedicated repository for all your project files. Upload PDFs, 3D printing STLs, CAD files, and images. Powered by Cloudinary for lightning-fast media processing and secure cloud storage.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Cost Tracking</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Keep your project under budget. Record every expense (PCBs, Cloud Servers, Logistics), categorize them, and track who paid for what. A visual gauge compares your actual cost against your estimated budget.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Technical Notes & Decisions</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Write rich-text technical notes to document architectural choices. Log major design pivots in the Decision Log so future team members understand why a specific approach was abandoned.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-primary border-b pb-2">4. Advanced Modes & Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Adaptive Device Layouts</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">Upon first login, select how you want to use the app (Laptop, Tablet, or Phone). The Progressive Web App (PWA) architecture instantly optimizes the sidebar and navigation specifically for your screen size.</p>
              </div>
              <div className="p-6 border rounded-xl bg-card shadow-sm">
                <h4 className="font-bold text-lg mb-2">Admin Dashboard & Factory Reset</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">A highly secure backend administration panel. The Admin can provision accounts, manage permissions, and in extreme cases, perform a catastrophic Factory Reset using a secure phrase confirmation to wipe all databases clean.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
