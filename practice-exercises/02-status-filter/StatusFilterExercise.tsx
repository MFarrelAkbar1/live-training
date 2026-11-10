/**
 * EXERCISE 2 — Implement status filtering                 Difficulty: Easy
 *
 * Goal: three tab buttons — All / Active / Inactive — that filter the list.
 *
 * Rules:
 *  - Each tab shows a count, e.g. "Active (9)".
 *  - The selected tab is visually highlighted.
 *  - Use the `StatusFilter` type ('all' | 'active' | 'inactive') for the state.
 */
import { useState } from 'react';
import type { StatusFilter, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function filterByStatus(users: User[], status: StatusFilter): User[] {
  // TODO 1: Return all users when status is 'all'.
  // TODO 2: Otherwise return only users whose `status` matches.
  return users;
}

const tabs: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function StatusFilterExercise() {
  // TODO 3: Create `selectedStatus` state typed as StatusFilter, defaulting to 'all'.
  const selectedStatus: StatusFilter = 'all';

  const visibleUsers = filterByStatus(mockUsers, selectedStatus);

  return (
    <div className="space-y-4">
      <div role="tablist" className="inline-flex rounded-md border border-slate-300 bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            // TODO 4: Set aria-selected and change the className when this tab is selected.
            // TODO 5: onClick → update selectedStatus.
            className="rounded px-3 py-1.5 text-sm font-medium text-slate-600"
          >
            {/* TODO 6: Show the count for this tab, e.g. "Active (9)". Reuse filterByStatus! */}
            {tab.label}
          </button>
        ))}
      </div>

      <SimpleUserList users={visibleUsers} />
    </div>
  );
}
