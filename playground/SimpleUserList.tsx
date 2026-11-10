import type { User } from '../src/types';

/**
 * Tiny read-only list used by several exercises so you can focus on the logic,
 * not the markup. You do NOT need to modify this file.
 */
export function SimpleUserList({ users }: { users: User[] }) {
  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
          <div className="min-w-0">
            <p className="font-medium text-slate-900">{user.fullName}</p>
            <p className="truncate text-xs text-slate-500">
              {user.email} · {user.department}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
              user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {user.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
