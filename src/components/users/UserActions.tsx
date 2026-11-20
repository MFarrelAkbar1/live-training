import { Pencil, Power, Trash2 } from 'lucide-react';
import type { User } from '../../types';

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (user: User) => void;
}

const iconButtonClasses =
  'rounded-md p-1.5 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500';

/** Shared by the desktop table rows and the mobile cards. */
export function UserActions({ user, onEdit, onToggleStatus, onDelete }: UserActionsProps) {
  const toggleLabel = user.status === 'active' ? 'Deactivate' : 'Activate';

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={() => onEdit(user)}
        className={`${iconButtonClasses} hover:text-blue-600`}
        aria-label={`Edit ${user.fullName}`}
        title="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onToggleStatus(user.id)}
        className={`${iconButtonClasses} hover:text-amber-600`}
        aria-label={`${toggleLabel} ${user.fullName}`}
        title={toggleLabel}
      >
        <Power className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(user)}
        className={`${iconButtonClasses} hover:text-red-600`}
        aria-label={`Delete ${user.fullName}`}
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
