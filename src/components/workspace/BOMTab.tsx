import React from 'react';
import { Package, ExternalLink } from 'lucide-react';

export default function BOMTab() {
  const bom = [
    { name: 'ESP32', partNo: 'ESP32-WROOM-32D', qty: 2, price: 350, supplier: 'Robu.in' },
    { name: 'Ultrasonic Sensor', partNo: 'HC-SR04', qty: 4, price: 100, supplier: 'ElectronicsComp' },
    { name: '10K Resistor', partNo: '10K-0805', qty: 20, price: 2, supplier: 'Local' },
    { name: 'Buck Converter', partNo: 'LM2596', qty: 1, price: 150, supplier: 'Robu.in' },
  ];

  const total = bom.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center bg-muted/20">
        <h2 className="text-xl font-bold flex items-center gap-2"><Package size={20}/> Bill of Materials</h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Cost</p>
          <p className="text-2xl font-bold text-primary">₹{total}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold">Component</th>
              <th className="px-6 py-3 font-semibold">Part No.</th>
              <th className="px-6 py-3 font-semibold text-right">Qty</th>
              <th className="px-6 py-3 font-semibold text-right">Unit Price</th>
              <th className="px-6 py-3 font-semibold text-right">Total</th>
              <th className="px-6 py-3 font-semibold">Supplier</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bom.map((item, i) => (
              <tr key={i} className="hover:bg-muted/30 transition">
                <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{item.partNo}</td>
                <td className="px-6 py-4 text-right font-medium">{item.qty}</td>
                <td className="px-6 py-4 text-right">₹{item.price}</td>
                <td className="px-6 py-4 text-right font-bold text-primary">₹{item.qty * item.price}</td>
                <td className="px-6 py-4 flex items-center gap-1 hover:text-primary cursor-pointer">
                  {item.supplier} <ExternalLink size={12}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
