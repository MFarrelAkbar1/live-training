/**
 * EXERCISE 7 — Implement Edit User functionality          Difficulty: Medium
 *
 * Goal: click "Edit" on a row → the row turns into an inline form pre-filled with
 * that user's data → "Save" updates the list, "Cancel" discards changes.
 *
 * Requirements:
 *  - Only one row can be edited at a time (store `editingUserId: number | null`).
 *  - The draft lives in its own state; the list is NOT changed until Save.
 *  - Save updates the user immutably using map().
 *  - Full name cannot be saved empty (disable Save or show an error).
 *  - Pressing Enter in an input saves (hint: wrap inputs in a <form>).
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

interface EditDraft {
  fullName: string;
  email: string;
}

export function updateUserById(users: User[], id: number, changes: Partial<User>): User[] {
  // TODO 1: Return a NEW array where the user with `id` is replaced by { ...user, ...changes }.
  //         All other users stay the same object.
  return users;
}

export default function EditUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 5));
  // TODO 2: Add `editingUserId` state (number | null) and `draft` state (EditDraft).

  function startEditing(user: User) {
    // TODO 3: Set editingUserId and copy the user's fullName/email into draft.
  }

  function cancelEditing() {
    // TODO 4: Reset editingUserId to null.
  }

  function saveEditing() {
    // TODO 5: Validate draft, call updateUserById, then stop editing.
  }

  return (
    <table className="min-w-full divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white text-sm">
      <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {users.map((user) => (
          // TODO 6: If this user is being edited, render inputs bound to `draft`
          //         plus Save / Cancel buttons. Otherwise render the read-only row below.
          <tr key={user.id}>
            <td className="px-4 py-2 font-medium text-slate-900">{user.fullName}</td>
            <td className="px-4 py-2 text-slate-600">{user.email}</td>
            <td className="px-4 py-2 text-right">
              <button
                type="button"
                onClick={() => startEditing(user)}
                className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium hover:bg-slate-50"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
