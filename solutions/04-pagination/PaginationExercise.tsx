/**
 * SOLUTION — Exercise 4: Pagination
 *
 * Key points:
 *  - Pages are 1-based for humans; slice() indexes are 0-based → (page - 1) * pageSize.
 *  - Only `currentPage` and `pageSize` are state. Everything else is derived.
 *  - Resetting to page 1 happens in the EVENT HANDLER, not in a useEffect.
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { SimpleUserList } from '../../playground/SimpleUserList';

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function paginate(items: User[], page: number, pageSize: number): User[] {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

const PAGE_SIZE_OPTIONS = [3, 5, 10];

export default function PaginationExercise() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const totalItems = mockUsers.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const visibleUsers = paginate(mockUsers, currentPage, pageSize);

  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-slate-700">
        Rows per page
        <select
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setCurrentPage(1);
          }}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <SimpleUserList users={visibleUsers} />

      <nav aria-label="Pagination" className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-slate-500">
          Showing {firstItem}–{lastItem} of {totalItems} users · Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40"
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setCurrentPage(pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={`min-w-8 rounded-md px-2 py-1.5 ${
                pageNumber === currentPage ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </nav>
    </div>
  );
}
