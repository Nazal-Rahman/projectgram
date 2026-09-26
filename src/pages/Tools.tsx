import { useState } from 'react';
import { Calculator, Zap, Thermometer, Battery, Wrench } from 'lucide-react';

export default function Tools() {
  // Ohm's Law State
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');

  // Battery Life State
  const [capacity, setCapacity] = useState('2000'); // mAh
  const [consumption, setConsumption] = useState('50'); // mA
  
  const calculateOhms = () => {
    if (voltage && current) return (parseFloat(voltage) / parseFloat(current)).toFixed(2) + ' Ω';
    if (voltage && resistance) return (parseFloat(voltage) / parseFloat(resistance)).toFixed(2) + ' A';
    if (current && resistance) return (parseFloat(current) * parseFloat(resistance)).toFixed(2) + ' V';
    return 'Enter two values';
  };

  const calculateBattery = () => {
    if (capacity && consumption) {
      const hours = parseFloat(capacity) / parseFloat(consumption);
      return `${hours.toFixed(1)} Hours (${(hours/24).toFixed(1)} Days)`;
    }
    return '-';
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="border-b pb-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Engineering Tools</h1>
        <p className="text-muted-foreground mt-2">Quick calculators and reference tools for hardware design.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Ohm's Law */}
        <div className="border bg-card rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b bg-muted/30 flex items-center gap-3">
            <Zap className="text-primary" size={20} />
            <h2 className="font-bold text-lg">Ohm's Law Calculator</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Enter any two values to calculate the third.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium">Voltage (V)</label>
                <input type="number" value={voltage} onChange={e => setVoltage(e.target.value)} className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50" placeholder="Volts" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium">Current (I)</label>
                <input type="number" value={current} onChange={e => setCurrent(e.target.value)} className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50" placeholder="Amps" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium">Resistance (R)</label>
                <input type="number" value={resistance} onChange={e => setResistance(e.target.value)} className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50" placeholder="Ohms" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
              <span className="font-bold text-primary">Result:</span>
              <span className="font-mono text-lg font-bold">{calculateOhms()}</span>
            </div>
            <button 
              onClick={() => { setVoltage(''); setCurrent(''); setResistance(''); }}
              className="text-xs text-muted-foreground hover:text-foreground transition underline w-full text-center mt-2"
            >
              Clear Fields
            </button>
          </div>
        </div>

        {/* Battery Life Calculator */}
        <div className="border bg-card rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b bg-muted/30 flex items-center gap-3">
            <Battery className="text-green-500" size={20} />
            <h2 className="font-bold text-lg">IoT Battery Estimator</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Estimate device runtime based on continuous load.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">Capacity (mAh)</label>
                <input type="number" value={capacity} onChange={e => setCapacity(e.target.value)} className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50" placeholder="e.g. 2000" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">Avg Draw (mA)</label>
                <input type="number" value={consumption} onChange={e => setConsumption(e.target.value)} className="flex-1 p-2 border rounded-md bg-background focus:ring-2 focus:ring-primary/50" placeholder="e.g. 50" />
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-between">
              <span className="font-bold">Estimated Life:</span>
              <span className="font-mono text-lg font-bold">{calculateBattery()}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
