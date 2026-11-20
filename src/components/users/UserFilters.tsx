import { ArrowDownAZ, ArrowUpAZ, Search } from 'lucide-react';
import type { Department, DepartmentFilter, SortDirection, StatusFilter } from '../../types';
import { DEPARTMENTS } from '../../data/constants';

interface UserFiltersProps {
  searchQuery: string;
  statusFilter: StatusFilter;
  departmentFilter: DepartmentFilter;
  sortDirection: SortDirection;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: StatusFilter) => void;
  onDepartmentChange: (department: DepartmentFilter) => void;
  onSortToggle: () => void;
}

const selectClasses =
  'rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500';

/** Purely presentational: all values come from props, all changes go up via callbacks. */
export function UserFilters({
  searchQuery,
  statusFilter,
  departmentFilter,
  sortDirection,
  onSearchChange,
  onStatusChange,
  onDepartmentChange,
  onSortToggle,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <label htmlFor="user-search" className="sr-only">
          Search users
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id="user-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email…"
          className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="sr-only" htmlFor="status-filter">
          Filter by status
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          className={selectClasses}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <label className="sr-only" htmlFor="department-filter">
          Filter by department
        </label>
        <select
          id="department-filter"
          value={departmentFilter}
          onChange={(event) => onDepartmentChange(event.target.value as DepartmentFilter)}
          className={selectClasses}
        >
          <option value="all">All departments</option>
          {DEPARTMENTS.map((department: Department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onSortToggle}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          aria-label={`Sort by name, currently ${sortDirection === 'asc' ? 'A to Z' : 'Z to A'}`}
        >
          {sortDirection === 'asc' ? (
            <ArrowDownAZ className="h-4 w-4" />
          ) : (
            <ArrowUpAZ className="h-4 w-4" />
          )}
          Name {sortDirection === 'asc' ? 'A–Z' : 'Z–A'}
        </button>
      </div>
    </div>
  );
}
