/**
 * SOLUTION — Exercise 8: Delete User with confirmation
 *
 * Key points:
 *  - `userPendingDelete` doubles as "is the dialog open?" (null = closed). One state, two meanings.
 *  - filter() returns a new array → React sees a new reference → re-render.
 *  - Custom confirmation keeps the UI consistent and testable (window.confirm blocks the thread).
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

export function removeUserById(users: User[], id: number): User[] {
  return users.filter((user) => user.id !== id);
}

export default function DeleteUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 5));
  const [userPendingDelete, setUserPendingDelete] = useState<User | null>(null);

  function requestDelete(user: User) {
    setUserPendingDelete(user);
  }

  function confirmDelete() {
    if (!userPendingDelete) return;
    setUsers((current) => removeUserById(current, userPendingDelete.id));
    setUserPendingDelete(null);
  }

  function cancelDelete() {
    setUserPendingDelete(null);
  }

  return (
    <div className="space-y-4">
      {userPendingDelete && (
        <div
          role="alertdialog"
          aria-labelledby="ex8-confirm-title"
          className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p id="ex8-confirm-title" className="text-sm text-red-800">
            Delete <strong>{userPendingDelete.fullName}</strong>? This cannot be undone.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={cancelDelete}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Confirm delete
            </button>
          </div>
        </div>
      )}

      {users.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center">
          <p className="text-sm text-slate-500">All users have been deleted.</p>
          <button
            type="button"
            onClick={() => setUsers(mockUsers.slice(0, 5))}
            className="mt-3 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            Restore users
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
