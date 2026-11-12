/**
 * SOLUTION — Exercise 3: Sorting
 *
 * Key points:
 *  - `[...users].sort()` — sort() mutates, so copying first keeps props/state immutable.
 *  - The functional updater `setDirection(current => ...)` always uses the latest state.
 *  - Bonus implemented: a separate "Newest first" mode.
 */
import { useState } from 'react';
import type { SortDirection, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function sortByName(users: User[], direction: SortDirection): User[] {
  return [...users].sort((a, b) => {
    const result = a.fullName.localeCompare(b.fullName);
    return direction === 'asc' ? result : -result;
  });
}

export function sortByNewest(users: User[]): User[] {
  return [...users].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

type SortMode = 'name' | 'newest';

export default function SortingExercise() {
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [sortMode, setSortMode] = useState<SortMode>('name');

  function handleToggle() {
    setSortMode('name');
    setDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  }

  const sortedUsers = sortMode === 'name' ? sortByName(mockUsers, direction) : sortByNewest(mockUsers);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleToggle}
          className={`rounded-md border px-3 py-2 text-sm font-medium ${
            sortMode === 'name' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-300 bg-white text-slate-700'
          }`}
        >
          Name {direction === 'asc' ? 'A–Z' : 'Z–A'}
        </button>
        <button
          type="button"
          onClick={() => setSortMode('newest')}
          className={`rounded-md border px-3 py-2 text-sm font-medium ${
            sortMode === 'newest' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-300 bg-white text-slate-700'
          }`}
        >
          Newest first
        </button>
      </div>

      <SimpleUserList users={sortedUsers} />
    </div>
  );
}
