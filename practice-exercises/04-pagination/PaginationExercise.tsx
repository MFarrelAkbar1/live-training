/**
 * EXERCISE 4 — Implement pagination                       Difficulty: Medium
 *
 * Goal: show users page by page with Previous / Next buttons.
 *
 * Rules:
 *  - Show "Page X of Y" and "Showing A–B of N users".
 *  - Disable "Previous" on page 1 and "Next" on the last page.
 *  - Changing the page size goes back to page 1.
 *  - With 0 users there is still 1 page (avoid "Page 1 of 0").
 *  - BONUS: render numbered page buttons [1] [2] [3].
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function getTotalPages(totalItems: number, pageSize: number): number {
  // TODO 1: Math.ceil(totalItems / pageSize), but never less than 1.
  return 1;
}

export function paginate(items: User[], page: number, pageSize: number): User[] {
  // TODO 2: Compute startIndex from page (1-based!) and pageSize, then use slice().
  return items;
}

const PAGE_SIZE_OPTIONS = [3, 5, 10];

export default function PaginationExercise() {
  // TODO 3: Create `currentPage` (default 1) and `pageSize` (default 5) state.
  const currentPage = 1;
  const pageSize = 5;

  const totalPages = getTotalPages(mockUsers.length, pageSize);
  const visibleUsers = paginate(mockUsers, currentPage, pageSize);

  // TODO 4: Compute firstItem and lastItem for the "Showing A–B of N" label.

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-slate-700">
        Rows per page
        {/* TODO 5: Controlled select. On change: update pageSize (Number(...)) AND reset page to 1. */}
        <select className="rounded-md border border-slate-300 px-2 py-1 text-sm">
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <SimpleUserList users={visibleUsers} />

      <nav aria-label="Pagination" className="flex items-center justify-between text-sm">
        {/* TODO 6: "Showing A–B of N users" */}
        <span className="text-slate-500">Page {currentPage} of {totalPages}</span>
        <div className="flex gap-2">
          {/* TODO 7: onClick handlers + disabled conditions for both buttons. */}
          <button type="button" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40">
            Previous
          </button>
          <button type="button" className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40">
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
