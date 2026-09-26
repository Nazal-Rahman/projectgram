import React from 'react';
import { IndianRupee } from 'lucide-react';

export default function CostsTab() {
  const transactions: any[] = [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-6 bg-card shadow-sm border-l-4 border-l-primary">
          <p className="text-muted-foreground text-sm font-medium">Estimated Budget</p>
          <h3 className="text-3xl font-bold mt-2">₹0</h3>
        </div>
        <div className="border rounded-xl p-6 bg-card shadow-sm border-l-4 border-l-red-500">
          <p className="text-muted-foreground text-sm font-medium">Actual Cost</p>
          <h3 className="text-3xl font-bold mt-2">₹0</h3>
        </div>
        <div className="border rounded-xl p-6 bg-card shadow-sm border-l-4 border-l-green-500">
          <p className="text-muted-foreground text-sm font-medium">Remaining</p>
          <h3 className="text-3xl font-bold mt-2">₹0</h3>
        </div>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2"><IndianRupee size={20}/> Expense Transactions</h2>
          <button className="px-4 py-2 border rounded-lg hover:bg-muted font-medium transition text-sm">Add Expense</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Description</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Paid By</th>
                <th className="px-6 py-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-muted/30 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{t.date}</td>
                  <td className="px-6 py-4 font-medium">{t.desc}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-muted rounded-full text-xs">{t.category}</span></td>
                  <td className="px-6 py-4">{t.paidBy}</td>
                  <td className="px-6 py-4 text-right font-bold text-red-500">-₹{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
