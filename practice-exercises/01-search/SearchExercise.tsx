/**
 * EXERCISE 1 — Implement search functionality            Difficulty: Easy
 *
 * Goal: filter the user list by name OR email as the person types.
 *
 * Rules:
 *  - Case-insensitive ("LEANNE" matches "Leanne Graham").
 *  - Ignore leading/trailing spaces in the query.
 *  - Empty query → show every user.
 *  - Do NOT mutate the original array.
 *  - Show "No users match "<query>"" when nothing matches.
 *
 * Open the playground (npm run practice) → tab "01 Search" to see your result.
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function searchUsers(users: User[], query: string): User[] {
  // TODO 1: Normalize the query (trim + lowercase).
  // TODO 2: If the normalized query is empty, return `users` unchanged.
  // TODO 3: Return users whose fullName OR email includes the query.
  //         Hint: Array.prototype.filter + String.prototype.includes
  return users;
}

export default function SearchExercise() {
  // TODO 4: Replace this constant with a piece of state: useState('')
  const query = '';

  const results = searchUsers(mockUsers, query);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700" htmlFor="ex1-search">
        Search users
      </label>
      {/* TODO 5: Make this a CONTROLLED input: add `value` and an `onChange` handler. */}
      <input
        id="ex1-search"
        type="search"
        placeholder="Search by name or email…"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />

      <p className="text-sm text-slate-500">{results.length} result(s)</p>

      {/* TODO 6: Use conditional rendering — show an empty message when results.length === 0. */}
      <SimpleUserList users={results} />
    </div>
  );
}
