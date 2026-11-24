export type UserStatus = 'active' | 'inactive';

export type Department =
  | 'Engineering'
  | 'Finance'
  | 'Human Resources'
  | 'Marketing'
  | 'Operations'
  | 'Sales';

export type Role = 'Admin' | 'Manager' | 'Staff' | 'Viewer';

/** A user as used everywhere inside the application. */
export interface User {
  id: number;
  fullName: string;
  email: string;
  department: Department;
  role: Role;
  status: UserStatus;
  /** ISO date string, e.g. "2026-03-14T00:00:00.000Z" */
  createdAt: string;
}

/** The fields a person fills in on the create / edit form. */
export type UserFormValues = Omit<User, 'id' | 'createdAt'>;

/** Validation errors keyed by form field. A missing key means "valid". */
export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

export type StatusFilter = 'all' | UserStatus;
export type DepartmentFilter = 'all' | Department;
export type SortDirection = 'asc' | 'desc';

/** Shape of a user returned by https://jsonplaceholder.typicode.com/users (only the fields we use). */
export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}
