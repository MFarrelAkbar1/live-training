import type { Department, Role } from '../types';

export const DEPARTMENTS: Department[] = [
  'Engineering',
  'Finance',
  'Human Resources',
  'Marketing',
  'Operations',
  'Sales',
];

export const ROLES: Role[] = ['Admin', 'Manager', 'Staff', 'Viewer'];

export const PAGE_SIZE = 5;

/** Users created within this many days count as "recently added". */
export const RECENT_DAYS = 30;
