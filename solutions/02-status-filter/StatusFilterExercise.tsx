/**
 * SOLUTION — Exercise 2: Status filter
 *
 * Key points:
 *  - A union type for the state means TypeScript rejects typos like 'Active'.
 *  - Counts are derived from the same pure function — no duplicated logic.
 */
import { useState } from 'react';
import type { StatusFilter, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function filterByStatus(users: User[], status: StatusFilter): User[] {
  if (status === 'all') return users;
  return users.filter((user) => user.status === status);
}

const tabs: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function StatusFilterExercise() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const visibleUsers = filterByStatus(mockUsers, selectedStatus);

  return (
    <div className="space-y-4">
      <div role="tablist" className="inline-flex rounded-md border border-slate-300 bg-white p-1">
        {tabs.map((tab) => {
          const isSelected = tab.value === selectedStatus;
          const count = filterByStatus(mockUsers, tab.value).length;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedStatus(tab.value)}
              className={`rounded px-3 py-1.5 text-sm font-medium ${
                isSelected ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      <SimpleUserList users={visibleUsers} />
    </div>
  );
}
