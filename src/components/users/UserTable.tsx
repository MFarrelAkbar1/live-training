import type { User } from '../../types';
import { formatDate } from '../../utils/format';
import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { UserActions } from './UserActions';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onToggleStatus: (id: number) => void;
  onDelete: (user: User) => void;
}

const columns = ['ID', 'Full Name', 'Email', 'Department', 'Role', 'Status', 'Created', 'Actions'];

export function UserTable({ users, onEdit, onToggleStatus, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                  column === 'Actions' ? 'text-right' : ''
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {users.map((user) => (
            // Use the stable database id as key — never the array index,
            // because rows are re-ordered by sorting and removed by deleting.
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="whitespace-nowrap px-4 py-3 tabular-nums text-slate-500">#{user.id}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={user.fullName} />
                  <span className="font-medium text-slate-900">{user.fullName}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{user.email}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{user.department}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{user.role}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <StatusBadge status={user.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <UserActions
                  user={user}
                  onEdit={onEdit}
                  onToggleStatus={onToggleStatus}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
