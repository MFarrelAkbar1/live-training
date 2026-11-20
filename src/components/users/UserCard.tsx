import type { ReactNode } from 'react';
import { Building2, Mail } from 'lucide-react';
import type { User } from '../../types';
import { formatDate } from '../../utils/format';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';

interface UserCardProps {
  user: User;
  /** Optional slot for buttons — this is component composition via props. */
  actions?: ReactNode;
}

/** Compact user summary. Used for the mobile list and the "recently added" panel. */
export function UserCard({ user, actions }: UserCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={user.fullName} />
          <div className="min-w-0">
            <h3 className="truncate font-medium text-slate-900">{user.fullName}</h3>
            <p className="text-xs text-slate-500">
              {user.role} · Joined {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
        <StatusBadge status={user.status} />
      </div>

      <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <dt>
            <Mail className="h-4 w-4 text-slate-400" aria-label="Email" />
          </dt>
          <dd className="truncate">{user.email}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt>
            <Building2 className="h-4 w-4 text-slate-400" aria-label="Department" />
          </dt>
          <dd>{user.department}</dd>
        </div>
      </dl>

      {actions && <div className="mt-3 border-t border-slate-100 pt-2">{actions}</div>}
    </article>
  );
}
