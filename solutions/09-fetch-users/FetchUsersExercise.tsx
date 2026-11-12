/**
 * SOLUTION — Exercise 9: Fetch users from a REST API
 *
 * Key points:
 *  - useEffect callbacks must return nothing or a cleanup function, so they can't be
 *    `async` themselves (an async function returns a Promise).
 *  - fetch() rejects only on network failure; HTTP errors must be checked with response.ok.
 *  - AbortController prevents setting state after unmount and avoids race conditions.
 *  - In development, React StrictMode runs effects twice (mount → unmount → mount);
 *    the cleanup aborts the first request, which is exactly why cleanup matters.
 */
import { useEffect, useState } from 'react';
import type { ApiUser } from '../../src/types';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<ApiUser[]> {
  const response = await fetch(USERS_URL, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data: ApiUser[] = await response.json();
  return data;
}

export default function FetchUsersExercise() {
  const [users, setUsers] = useState<ApiUser[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const fetchedUsers = await getUsers(controller.signal);
        setUsers(fetchedUsers);
      } catch (error) {
        if (controller.signal.aborted) return; // expected on unmount
        console.error('Failed to fetch users:', error);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Fetched {users.length} users from JSONPlaceholder.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {users.map((user) => (
          <li key={user.id} className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
            <p className="font-medium text-slate-900">{user.name}</p>
            <p className="text-slate-600">{user.email}</p>
            <p className="text-xs text-slate-400">{user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
