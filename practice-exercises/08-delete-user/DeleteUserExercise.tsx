/**
 * EXERCISE 8 — Implement Delete User functionality        Difficulty: Easy–Medium
 *
 * Goal: delete a user, but only after the person confirms.
 *
 * Requirements:
 *  - Clicking "Delete" does NOT delete immediately. It shows a confirmation
 *    panel: "Delete <name>? This cannot be undone." with Confirm / Cancel.
 *  - Do NOT use window.confirm() — build the confirmation with React state.
 *  - Confirm removes the user immutably (filter). Cancel closes the panel.
 *  - When the list becomes empty, show an empty state with a "Restore users" button.
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

export function removeUserById(users: User[], id: number): User[] {
  // TODO 1: Return a new array without the user whose id matches. Hint: filter().
  return users;
}

export default function DeleteUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 5));
  // TODO 2: Add state for the user waiting for confirmation: useState<User | null>(null)

  function requestDelete(user: User) {
    // TODO 3: Remember which user should be deleted (opens the confirmation).
  }

  function confirmDelete() {
    // TODO 4: Remove the pending user and close the confirmation.
  }

  function cancelDelete() {
    // TODO 5: Close the confirmation without deleting.
  }

  return (
    <div className="space-y-4">
      {/* TODO 6: Conditionally render the confirmation panel when a user is pending.
          Give it role="alertdialog" and buttons for Confirm / Cancel. */}

      {/* TODO 7: If users.length === 0, render an empty state with a "Restore users" button
          that resets the list to mockUsers.slice(0, 5). */}

      <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
        {users.map((user) => (
          <li key={user.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="font-medium text-slate-900">{user.fullName}</span>
            <button
              type="button"
              onClick={() => requestDelete(user)}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
