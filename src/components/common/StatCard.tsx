import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: ReactNode;
  description?: string;
}

export function StatCard({ label, value, icon, description }: StatCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-500">{label}</h3>
        <span className="rounded-md bg-blue-50 p-2 text-blue-600">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold tabular-nums text-slate-900">{value}</p>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </article>
  );
}
