import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EXERCISES } from './exercises';
import '../src/index.css';

function Playground() {
  const [selectedId, setSelectedId] = useState(EXERCISES[0].id);
  const [showSolution, setShowSolution] = useState(false);

  const exercise = EXERCISES.find((item) => item.id === selectedId) ?? EXERCISES[0];
  const ActiveComponent = showSolution ? exercise.Solution : exercise.Starter;

  function selectExercise(id: string) {
    setSelectedId(id);
    setShowSolution(false); // always start a new exercise on YOUR version
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-slate-200 bg-white md:w-64 md:border-b-0 md:border-r">
        <div className="px-5 py-4">
          <h1 className="font-semibold text-slate-900">Practice Playground</h1>
          <p className="text-xs text-slate-500">Edit files in practice-exercises/ — this page hot-reloads.</p>
        </div>
        <nav aria-label="Exercises" className="px-3 pb-4">
          <ul className="flex gap-1 overflow-x-auto md:flex-col">
            {EXERCISES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => selectExercise(item.id)}
                  aria-current={item.id === selectedId ? 'page' : undefined}
                  className={`w-full whitespace-nowrap rounded-md px-3 py-2 text-left text-sm ${
                    item.id === selectedId ? 'bg-blue-50 font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="mr-2 tabular-nums text-slate-400">{item.id}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-4 sm:p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Exercise {exercise.id}: {exercise.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Difficulty: {exercise.difficulty} · <code className="text-xs">{exercise.file}</code>
              </p>
            </div>
            <label className="inline-flex shrink-0 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm">
              <input
                type="checkbox"
                checked={showSolution}
                onChange={(event) => setShowSolution(event.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Show reference solution
            </label>
          </header>

          {showSolution && (
            <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
              You are viewing the reference solution, not your own code.
            </p>
          )}

          {/* key resets the component's state when switching exercise / version */}
          <ActiveComponent key={`${exercise.id}-${showSolution ? 'solution' : 'starter'}`} />
        </div>
      </main>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
