import { Link } from 'react-router-dom';

const MOCK_DATA: any[] = [];

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">Create Project</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DATA.map(p => (
          <Link key={p.id} to={`/app/projects/${p.id}`} className="block border rounded-lg overflow-hidden bg-card hover:border-primary transition">
            <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground">
              [Cover Image]
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Status: {p.status}</span>
                <span>{p.version}</span>
              </div>
              <p className="text-sm font-semibold">Budget: {p.budget}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
