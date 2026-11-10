/**
 * EXERCISE 9 — Fetch users from a REST API                Difficulty: Medium
 *
 * Goal: load users from https://jsonplaceholder.typicode.com/users when the
 * component mounts and render name, email and company name.
 *
 * Requirements:
 *  - Use useEffect with an EMPTY dependency array (run once on mount).
 *  - Use async/await (remember: the useEffect callback itself can't be async —
 *    define an async function inside it and call it).
 *  - Check `response.ok` — fetch does NOT throw on 404/500!
 *  - Type the response with the provided ApiUser interface (no `any`).
 *  - BONUS: cancel the request on unmount with AbortController.
 *
 * Exercise 10 adds loading / error / empty states — keep this one focused on the fetch.
 */
import { useEffect, useState } from 'react';
import type { ApiUser } from '../../src/types';

export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers(signal?: AbortSignal): Promise<ApiUser[]> {
  // TODO 1: const response = await fetch(USERS_URL, { signal });
  // TODO 2: If !response.ok, throw new Error(`HTTP ${response.status}`).
  // TODO 3: Parse JSON and return it typed as ApiUser[].
  return [];
}

export default function FetchUsersExercise() {
  // TODO 4: Create `users` state: useState<ApiUser[]>([])

  // TODO 5: useEffect(() => { ... }, []) that calls getUsers() and stores the result.
  //         Wrap the await in try/catch and console.error the error for now.
  //         BONUS: create an AbortController and return () => controller.abort().

  const users: ApiUser[] = [];

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Fetched {users.length} users from JSONPlaceholder.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {/* TODO 6: Render each user: name, email, company.name. Use user.id as the key. */}
      </ul>
    </div>
  );
}
