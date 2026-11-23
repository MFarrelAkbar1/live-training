import type { User } from '../types';

/**
 * Fallback data used when the API is unreachable (offline, blocked network, etc.).
 * Also used by the practice exercises so they work without a network connection.
 */
export const mockUsers: User[] = [
  { id: 1, fullName: 'Leanne Graham', email: 'leanne.graham@acme.io', department: 'Engineering', role: 'Admin', status: 'active', createdAt: '2026-10-28T09:00:00.000Z' },
  { id: 2, fullName: 'Ervin Howell', email: 'ervin.howell@acme.io', department: 'Finance', role: 'Manager', status: 'active', createdAt: '2026-09-15T09:00:00.000Z' },
  { id: 3, fullName: 'Clementine Bauch', email: 'clementine.bauch@acme.io', department: 'Human Resources', role: 'Staff', status: 'inactive', createdAt: '2026-06-02T09:00:00.000Z' },
  { id: 4, fullName: 'Patricia Lebsack', email: 'patricia.lebsack@acme.io', department: 'Marketing', role: 'Staff', status: 'active', createdAt: '2026-11-01T09:00:00.000Z' },
  { id: 5, fullName: 'Chelsey Dietrich', email: 'chelsey.dietrich@acme.io', department: 'Operations', role: 'Viewer', status: 'active', createdAt: '2026-04-21T09:00:00.000Z' },
  { id: 6, fullName: 'Dennis Schulist', email: 'dennis.schulist@acme.io', department: 'Sales', role: 'Manager', status: 'inactive', createdAt: '2026-02-10T09:00:00.000Z' },
  { id: 7, fullName: 'Kurtis Weissnat', email: 'kurtis.weissnat@acme.io', department: 'Engineering', role: 'Staff', status: 'active', createdAt: '2026-10-19T09:00:00.000Z' },
  { id: 8, fullName: 'Nicholas Runolfsdottir', email: 'nicholas.runolfsdottir@acme.io', department: 'Finance', role: 'Viewer', status: 'active', createdAt: '2026-08-30T09:00:00.000Z' },
  { id: 9, fullName: 'Glenna Reichert', email: 'glenna.reichert@acme.io', department: 'Marketing', role: 'Admin', status: 'inactive', createdAt: '2026-01-05T09:00:00.000Z' },
  { id: 10, fullName: 'Clementina DuBuque', email: 'clementina.dubuque@acme.io', department: 'Engineering', role: 'Manager', status: 'active', createdAt: '2026-07-12T09:00:00.000Z' },
  { id: 11, fullName: 'Arif Rahman', email: 'arif.rahman@acme.io', department: 'Operations', role: 'Staff', status: 'active', createdAt: '2026-11-05T09:00:00.000Z' },
  { id: 12, fullName: 'Sarah Tan', email: 'sarah.tan@acme.io', department: 'Human Resources', role: 'Manager', status: 'active', createdAt: '2026-05-18T09:00:00.000Z' },
];
