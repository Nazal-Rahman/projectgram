import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';

const MOCK_DATA: any[] = [];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Component Inventory</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2">
          <Plus size={16} /> Add Component
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-card border rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Total Components</p>
          <p className="text-2xl font-bold">247</p>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm">
          <p className="text-sm text-yellow-500">Low Stock</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm">
          <p className="text-sm text-red-500">Out of Stock</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="p-4 bg-card border rounded-lg shadow-sm">
          <p className="text-sm text-blue-500">Reserved</p>
          <p className="text-2xl font-bold">27</p>
        </div>
      </div>

      <div className="border rounded-lg bg-card overflow-hidden">
        <div className="p-4 border-b flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={16} />
            <input 
              type="text" 
              placeholder="Search components, part numbers..." 
              className="w-full pl-9 pr-4 py-2 border rounded-md bg-background"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 border rounded-md flex items-center gap-2 hover:bg-accent">
            <Filter size={16} /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 font-semibold text-sm border-b">Component Name</th>
                <th className="p-4 font-semibold text-sm border-b">Part Number</th>
                <th className="p-4 font-semibold text-sm border-b">Status</th>
                <th className="p-4 font-semibold text-sm border-b">Total Qty</th>
                <th className="p-4 font-semibold text-sm border-b">Available</th>
                <th className="p-4 font-semibold text-sm border-b">Reserved</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => (
                <tr key={item.id} className="hover:bg-muted/50 border-b last:border-0">
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-muted-foreground text-sm">{item.partNo}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${item.status === 'IN STOCK' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        item.status === 'LOW STOCK' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                        'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{item.qty}</td>
                  <td className="p-4">{item.available}</td>
                  <td className="p-4 text-muted-foreground">{item.reserved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
