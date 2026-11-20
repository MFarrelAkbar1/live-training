import type { User } from '../../types';
import { formatDate } from '../../utils/format';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';

interface RecentUsersProps {
  users: User[];
}

export function RecentUsers({ users }: RecentUsersProps) {
  if (users.length === 0) {
    return <p className="px-5 py-8 text-center text-sm text-slate-500">No users added recently.</p>;
  }

  return (
    <ul className="divide-y divide-slate-100">
      {users.map((user) => (
        <li key={user.id} className="flex items-center justify-between gap-3 px-5 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={user.fullName} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{user.fullName}</p>
              <p className="truncate text-xs text-slate-500">
                {user.department} · {user.email}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <time dateTime={user.createdAt} className="hidden text-xs text-slate-500 sm:block">
              {formatDate(user.createdAt)}
            </time>
            <StatusBadge status={user.status} />
          </div>
        </li>
      ))}
    </ul>
  );
}
