import { useState } from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const MOCK_DATA = [];

export default function Tasks() {
  const [tasks, setTasks] = useState(MOCK_DATA);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'DONE' ? 'TO DO' : 'DONE' };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90 transition font-medium">
          Add Task
        </button>
      </div>

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        <div className="divide-y">
          {tasks.map(task => {
            const isDone = task.status === 'DONE';
            return (
              <div key={task.id} className={`p-4 flex items-start gap-4 transition-colors hover:bg-muted/30 ${isDone ? 'opacity-60' : ''}`}>
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={`mt-1 rounded-full flex-shrink-0 transition-colors ${isDone ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                >
                  {isDone ? <CheckCircle size={22} /> : <Circle size={22} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-base ${isDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{task.project}</p>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold
                    ${task.priority === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {task.priority}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                    <Clock size={12} /> {task.due}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
