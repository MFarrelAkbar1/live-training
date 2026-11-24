import type { DepartmentFilter, SortDirection, StatusFilter, User } from '../types';

export function searchUsers(users: User[], query: string): User[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return users;

  return users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery),
  );
}

export function filterByStatus(users: User[], status: StatusFilter): User[] {
  if (status === 'all') return users;
  return users.filter((user) => user.status === status);
}

export function filterByDepartment(users: User[], department: DepartmentFilter): User[] {
  if (department === 'all') return users;
  return users.filter((user) => user.department === department);
}

/** Returns a NEW sorted array. Array.prototype.sort mutates, so we copy first. */
export function sortByName(users: User[], direction: SortDirection): User[] {
  return [...users].sort((a, b) => {
    const result = a.fullName.localeCompare(b.fullName);
    return direction === 'asc' ? result : -result;
  });
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}
