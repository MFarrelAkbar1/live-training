/**
 * SOLUTION — Exercise 1: Search
 *
 * Key points to mention in an interview:
 *  - `query` is the only state; `results` is DERIVED on every render (no extra state, no useEffect).
 *  - filter() returns a new array, so the original data is never mutated.
 *  - Controlled input: React state is the single source of truth for the input value.
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function searchUsers(users: User[], query: string): User[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return users;

  return users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery),
  );
}

export default function SearchExercise() {
  const [query, setQuery] = useState('');

  const results = searchUsers(mockUsers, query);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700" htmlFor="ex1-search">
        Search users
      </label>
      <input
        id="ex1-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by name or email…"
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
      />

      <p className="text-sm text-slate-500">{results.length} result(s)</p>

      {results.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No users match "{query.trim()}"
        </p>
      ) : (
        <SimpleUserList users={results} />
      )}
    </div>
  );
}
