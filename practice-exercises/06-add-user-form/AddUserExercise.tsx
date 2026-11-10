/**
 * EXERCISE 6 — Implement an Add User form                 Difficulty: Medium
 *
 * Goal: a controlled form that adds a new user to the list.
 *
 * Requirements:
 *  - Fields: Full name (required), Email (required, valid format), Department (select).
 *  - Validate on submit. Show an error message under each invalid field.
 *  - Clear a field's error when the person types in that field.
 *  - Prevent the page reload on submit.
 *  - On success: add the user to the TOP of the list (immutably), reset the form.
 *  - New id = highest existing id + 1. createdAt = new Date().toISOString().
 *  - BONUS: reject an email that already exists in the list.
 */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Department, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { DEPARTMENTS } from '../../src/data/constants';
import { SimpleUserList } from '../../playground/SimpleUserList';

interface AddUserFormValues {
  fullName: string;
  email: string;
  department: Department;
}

type AddUserFormErrors = Partial<Record<keyof AddUserFormValues, string>>;

const initialValues: AddUserFormValues = { fullName: '', email: '', department: 'Engineering' };

export function validate(values: AddUserFormValues): AddUserFormErrors {
  const errors: AddUserFormErrors = {};
  // TODO 1: fullName is required (ignore whitespace-only input).
  // TODO 2: email is required AND must match a basic email regex, e.g. /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return errors;
}

export default function AddUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 4));
  // TODO 3: Create `values` state (AddUserFormValues) and `errors` state (AddUserFormErrors).

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    // TODO 4: Update the matching field in `values` immutably: { ...current, [name]: value }
    // TODO 5: Clear the error for that field.
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // TODO 6: Prevent default browser submit.
    // TODO 7: Validate. If there are errors, store them and stop.
    // TODO 8: Build the new User object and prepend it: setUsers((current) => [newUser, ...current])
    // TODO 9: Reset the form.
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <label htmlFor="ex6-name" className="block text-sm font-medium text-slate-700">Full name *</label>
          {/* TODO 10: Controlled input: name="fullName", value, onChange. Show errors.fullName below. */}
          <input id="ex6-name" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label htmlFor="ex6-email" className="block text-sm font-medium text-slate-700">Email *</label>
          {/* TODO 11: Controlled input: name="email". Show errors.email below. */}
          <input id="ex6-email" type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label htmlFor="ex6-dept" className="block text-sm font-medium text-slate-700">Department</label>
          {/* TODO 12: Controlled select: name="department". */}
          <select id="ex6-dept" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add user
        </button>
      </form>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-slate-700">Users ({users.length})</h3>
        <SimpleUserList users={users} />
      </section>
    </div>
  );
}
