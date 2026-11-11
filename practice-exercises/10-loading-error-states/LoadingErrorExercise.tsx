/**
 * EXERCISE 10 — Implement loading and error states         Difficulty: Medium–Hard
 *
 * Goal: a data-fetching component that handles EVERY state of a request.
 *
 * Use the provided `fakeFetchUsers(scenario)` from ./fakeApi.ts. Pick a scenario
 * from the dropdown to test each state.
 *
 * Requirements:
 *  - Loading:  show a spinner/text while the request is in flight.
 *  - Error:    show the error message and a "Retry" button that fetches again.
 *  - Empty:    show "No users found" when the request succeeds with [].
 *  - Success:  render the list.
 *  - Changing the scenario refetches automatically (it's a useEffect dependency).
 *  - Exactly ONE of the four states is visible at a time.
 *  - The `catch` parameter is `unknown` — narrow it with `instanceof Error`.
 *  - BONUS: if the scenario changes while a request is pending, ignore the stale
 *    response (hint: a local `let isCancelled = false` flag + cleanup function).
 */
import { useEffect, useState } from 'react';
import type { User } from '../../src/types';
import { SimpleUserList } from '../../playground/SimpleUserList';
import { fakeFetchUsers, SCENARIOS, type Scenario } from './fakeApi';

export default function LoadingErrorExercise() {
  const [scenario, setScenario] = useState<Scenario>('success');
  const [users, setUsers] = useState<User[]>([]);
  // TODO 1: Add `isLoading` (boolean) and `error` (string | null) state.
  // TODO 2: Add a `reloadCount` number state. Incrementing it should trigger a refetch.

  // TODO 3: Write a useEffect that depends on [scenario, reloadCount]:
  //   - set isLoading true and clear error
  //   - try { const result = await fakeFetchUsers(scenario); setUsers(result); }
  //   - catch (caught) { setError(caught instanceof Error ? caught.message : 'Unknown error'); }
  //   - finally { setIsLoading(false); }

  function handleRetry() {
    // TODO 4: Increment reloadCount.
  }

  // TODO 5: Replace this with conditional rendering for loading → error → empty → success.
  function renderContent() {
    return <SimpleUserList users={users} />;
  }

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-slate-700">
        Simulated scenario
        <select
          value={scenario}
          onChange={(event) => setScenario(event.target.value as Scenario)}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm"
        >
          {SCENARIOS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <section className="min-h-48 rounded-lg border border-slate-200 bg-white p-4">{renderContent()}</section>
    </div>
  );
}
