import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OverviewTab from '../components/workspace/OverviewTab';
import TeamTab from '../components/workspace/TeamTab';
import MilestonesTab from '../components/workspace/MilestonesTab';
import NotesTab from '../components/workspace/NotesTab';
import FilesTab from '../components/workspace/FilesTab';
import BOMTab from '../components/workspace/BOMTab';
import ExperimentsTab from '../components/workspace/ExperimentsTab';
import BuildLogsTab from '../components/workspace/BuildLogsTab';
import CostsTab from '../components/workspace/CostsTab';
import AISearchTab from '../components/workspace/AISearchTab';

export default function ProjectWorkspace() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  
  const tabs = [
    'Overview', 'Tasks', 'Team', 'Milestones', 'Notes', 'Files', 
    'BOM', 'Inventory', 'Experiments', 'Build Logs', 'Costs', 'AI Search'
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview': return <OverviewTab />;
      case 'Team': return <TeamTab />;
      case 'Milestones': return <MilestonesTab />;
      case 'Notes': return <NotesTab />;
      case 'Files': return <FilesTab />;
      case 'BOM': return <BOMTab />;
      case 'Experiments': return <ExperimentsTab />;
      case 'Build Logs': return <BuildLogsTab />;
      case 'Costs': return <CostsTab />;
      case 'AI Search': return <AISearchTab />;
      case 'Tasks': 
        return (
            <div className="border rounded-lg p-6 bg-card">
              <h2 className="text-xl font-bold mb-4">Kanban Board (Tasks)</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-2 rounded-md min-h-[200px]">
                  <h3 className="font-semibold mb-2 px-1">TO DO</h3>
                  <div className="bg-card p-3 rounded shadow-sm text-sm border mb-2 cursor-pointer hover:border-primary">Research sensor</div>
                  <div className="bg-card p-3 rounded shadow-sm text-sm border cursor-pointer hover:border-primary">Buy components</div>
                </div>
                <div className="bg-muted p-2 rounded-md min-h-[200px]">
                  <h3 className="font-semibold mb-2 px-1">IN PROGRESS</h3>
                  <div className="bg-card p-3 rounded shadow-sm text-sm border cursor-pointer hover:border-primary">PCB design</div>
                </div>
                <div className="bg-muted p-2 rounded-md min-h-[200px]">
                  <h3 className="font-semibold mb-2 px-1">DONE</h3>
                  <div className="bg-card p-3 rounded shadow-sm text-sm border line-through text-muted-foreground">Requirements</div>
                </div>
              </div>
            </div>
        );
      case 'Inventory':
        return (
          <div className="border rounded-lg p-12 bg-card text-center flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground mb-4">The <strong>Inventory</strong> tab points to the main global inventory in this demo.</p>
            <Link to="/app/inventory" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">Go to Global Inventory</Link>
          </div>
        );
      default:
        return (
          <div className="border rounded-lg p-12 bg-card text-center flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-muted-foreground mb-4">The <strong>{activeTab}</strong> module is currently being built.</p>
            <button onClick={() => setActiveTab('Overview')} className="px-4 py-2 border rounded hover:bg-accent">Back to Overview</button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Project Workspace (ID: {id || '1'})</h1>
        <p className="text-muted-foreground mt-2">Energy Optimization System • V2.1 • PROTOTYPE</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 border-b scrollbar-hide">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md whitespace-nowrap font-medium text-sm transition ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 lg:col-span-3 space-y-6">
          {renderTabContent()}
        </div>

        <div className="col-span-1 space-y-6">
          <div className="border rounded-lg p-6 bg-card shadow-sm">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Total Budget:</span> <span className="font-medium">₹6,000</span></div>
              <div className="flex justify-between"><span>Spent:</span> <span className="text-red-500 font-medium">₹4,400</span></div>
              <div className="w-full bg-muted rounded-full h-2 mt-2"><div className="bg-primary h-2 rounded-full" style={{ width: '73%' }}></div></div>
              <div className="flex justify-between font-bold pt-3 border-t mt-3"><span>Remaining:</span> <span>₹1,600</span></div>
            </div>
          </div>

          <div className="border rounded-lg p-6 bg-card shadow-sm">
            <h2 className="text-lg font-bold mb-2">GitHub Repository</h2>
            <div className="text-sm">
              <a href="#" className="font-semibold text-primary hover:underline">energy-optimization</a>
              <p className="text-muted-foreground mt-1">Branch: main</p>
              <p className="text-xs mt-3 text-muted-foreground">Last commit: 2 hours ago</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-6 bg-card shadow-sm">
            <h2 className="text-lg font-bold mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-muted rounded text-xs font-medium">ESP32</span>
              <span className="px-2 py-1 bg-muted rounded text-xs font-medium">IoT</span>
              <span className="px-2 py-1 bg-muted rounded text-xs font-medium">Power</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
