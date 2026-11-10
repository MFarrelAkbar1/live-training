/**
 * EXERCISE 3 — Implement sorting                          Difficulty: Easy–Medium
 *
 * Goal: a button that toggles sorting by name between A→Z and Z→A.
 *
 * Rules:
 *  - The ORIGINAL array must not be mutated (Array.sort mutates in place!).
 *  - Use localeCompare so the comparison handles accents/case properly.
 *  - The button label reflects the current direction.
 *  - BONUS: add a second button to sort by createdAt (newest first).
 */
import { useState } from 'react';
import type { SortDirection, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function sortByName(users: User[], direction: SortDirection): User[] {
  // TODO 1: Copy the array first ([...users] or users.slice()).
  // TODO 2: Sort with a comparator using a.fullName.localeCompare(b.fullName).
  // TODO 3: Reverse the result of the comparator when direction === 'desc'.
  return users;
}

export default function SortingExercise() {
  // TODO 4: Create `direction` state (SortDirection), default 'asc'.
  const direction: SortDirection = 'asc';

  function handleToggle() {
    // TODO 5: Flip the direction. Use the functional updater form:
    //         setDirection((current) => ...)
  }

  const sortedUsers = sortByName(mockUsers, direction);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleToggle}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {/* TODO 6: Show "Name A–Z" or "Name Z–A" depending on direction. */}
        Sort by name
      </button>

      <SimpleUserList users={sortedUsers} />
    </div>
  );
}
