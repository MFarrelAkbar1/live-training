/**
 * SOLUTION — Exercise 7: Edit User
 *
 * Key points:
 *  - "Which row is being edited" (editingUserId) and "what's typed" (draft) are separate state.
 *  - The list only changes on Save → Cancel is trivial (just forget the draft).
 *  - map() + spread → immutable update; unchanged users keep the same object reference.
 *  - HTML5 `form` attribute lets inputs in different <td>s belong to one <form>.
 */
import { useState, type FormEvent } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

interface EditDraft {
  fullName: string;
  email: string;
}

export function updateUserById(users: User[], id: number, changes: Partial<User>): User[] {
  return users.map((user) => (user.id === id ? { ...user, ...changes } : user));
}

const FORM_ID = 'ex7-edit-form';

export default function EditUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 5));
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [draft, setDraft] = useState<EditDraft>({ fullName: '', email: '' });

  const isDraftValid = draft.fullName.trim() !== '' && draft.email.trim() !== '';

  function startEditing(user: User) {
    setEditingUserId(user.id);
    setDraft({ fullName: user.fullName, email: user.email });
  }

  function cancelEditing() {
    setEditingUserId(null);
  }

  function saveEditing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingUserId === null || !isDraftValid) return;

    setUsers((current) =>
      updateUserById(current, editingUserId, {
        fullName: draft.fullName.trim(),
        email: draft.email.trim(),
      }),
    );
    setEditingUserId(null);
  }

  return (
    <>
      {/* One form for the whole table; inputs reference it via the `form` attribute. */}
      <form id={FORM_ID} onSubmit={saveEditing} />
      <table className="min-w-full divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) =>
            user.id === editingUserId ? (
              <tr key={user.id} className="bg-blue-50/50">
                <td className="px-4 py-2">
                  <input
                    form={FORM_ID}
                    aria-label="Full name"
                    value={draft.fullName}
                    onChange={(event) => setDraft({ ...draft, fullName: event.target.value })}
                    className="w-full rounded-md border border-slate-300 px-2 py-1"
                    autoFocus
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    form={FORM_ID}
                    aria-label="Email"
                    type="email"
                    value={draft.email}
                    onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                    className="w-full rounded-md border border-slate-300 px-2 py-1"
                  />
                </td>
                <td className="space-x-2 whitespace-nowrap px-4 py-2 text-right">
                  <button
                    type="submit"
                    form={FORM_ID}
                    disabled={!isDraftValid}
                    className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-medium text-white disabled:opacity-40"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
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
            ),
          )}
        </tbody>
      </table>
    </>
  );
}
