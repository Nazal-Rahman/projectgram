import { Link } from 'react-router-dom';
import { Briefcase, CheckCircle, MessageSquare, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Good morning, Naseeb!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card border rounded-lg shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-full"><Briefcase /></div>
          <div><p className="text-sm text-muted-foreground">Active Projects</p><p className="text-2xl font-bold">4</p></div>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-full"><CheckCircle /></div>
          <div><p className="text-sm text-muted-foreground">Pending Tasks</p><p className="text-2xl font-bold">7</p></div>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full"><MessageSquare /></div>
          <div><p className="text-sm text-muted-foreground">Unread Messages</p><p className="text-2xl font-bold">12</p></div>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-full"><Clock /></div>
          <div><p className="text-sm text-muted-foreground">Upcoming Deadlines</p><p className="text-2xl font-bold">3</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Nazal uploaded schematic_v3.pdf</span><span className="text-xs">10:30 AM</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Rahul completed PCB Layout</span><span className="text-xs">09:15 AM</span></li>
            <li className="flex justify-between border-b pb-2"><span className="text-muted-foreground">Experiment #08 created</span><span className="text-xs">08:40 AM</span></li>
          </ul>
        </div>
        
        <div className="border rounded-lg p-6 bg-card">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/app/projects" className="p-4 text-center border rounded-md hover:bg-accent font-medium shadow-sm transition">New Project</Link>
            <Link to="/app/inventory" className="p-4 text-center border rounded-md hover:bg-accent font-medium shadow-sm transition">Check Inventory</Link>
            <Link to="/app/tasks" className="p-4 text-center border rounded-md hover:bg-accent font-medium shadow-sm transition">My Tasks</Link>
            <Link to="/app/messages" className="p-4 text-center border rounded-md hover:bg-accent font-medium shadow-sm transition">Messages</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
