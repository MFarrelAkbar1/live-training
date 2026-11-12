/**
 * SOLUTION — Exercise 10: Loading, error, empty and success states
 *
 * Key points:
 *  - Order of checks matters: loading → error → empty → success (early returns).
 *  - Retry = change a dependency of the effect (reloadCount) so it runs again.
 *  - `isCancelled` flag ignores responses from an out-of-date request (race condition).
 *  - `catch (caught)` is typed `unknown` in strict TS → narrow with instanceof.
 */
import { useEffect, useState } from 'react';
import { AlertTriangle, Inbox, Loader2, RotateCw } from 'lucide-react';
import type { User } from '../../src/types';
import { SimpleUserList } from '../../playground/SimpleUserList';
import {
  fakeFetchUsers,
  SCENARIOS,
  type Scenario,
} from '../../practice-exercises/10-loading-error-states/fakeApi';

export default function LoadingErrorExercise() {
  const [scenario, setScenario] = useState<Scenario>('success');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fakeFetchUsers(scenario);
        if (!isCancelled) setUsers(result);
      } catch (caught) {
        if (!isCancelled) {
          setError(caught instanceof Error ? caught.message : 'Unknown error');
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [scenario, reloadCount]);

  function handleRetry() {
    setReloadCount((count) => count + 1);
  }

  function renderContent() {
    if (isLoading) {
      return (
        <div role="status" className="flex flex-col items-center gap-2 py-10 text-sm text-slate-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          Loading users…
        </div>
      );
    }

    if (error) {
      return (
        <div role="alert" className="flex flex-col items-center gap-3 py-10 text-center">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <p className="text-sm text-slate-700">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white"
          >
            <RotateCw className="h-4 w-4" /> Retry
          </button>
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center gap-2 py-10 text-sm text-slate-500">
          <Inbox className="h-6 w-6 text-slate-400" />
          No users found.
        </div>
      );
    }

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
