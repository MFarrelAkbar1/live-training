/**
 * SOLUTION — Exercise 6: Add User form
 *
 * Key points:
 *  - One `values` object + one generic handleChange (driven by the input's `name`).
 *  - validate() is a pure function → easy to unit test, easy to explain.
 *  - New state is created with spread syntax; the old array is never pushed to.
 */
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Department, User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';
import { DEPARTMENTS } from '../../src/data/constants';
import { SimpleUserList } from '../../playground/SimpleUserList';

interface AddUserFormValues {
  fullName: string;
  email: string;
  department: Department;
}

type AddUserFormErrors = Partial<Record<keyof AddUserFormValues, string>>;

const initialValues: AddUserFormValues = { fullName: '', email: '', department: 'Engineering' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(values: AddUserFormValues, existingEmails: string[] = []): AddUserFormErrors {
  const errors: AddUserFormErrors = {};
  const email = values.email.trim().toLowerCase();

  if (values.fullName.trim() === '') {
    errors.fullName = 'Full name is required.';
  }

  if (email === '') {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (existingEmails.includes(email)) {
    errors.email = 'This email is already registered.';
  }

  return errors;
}

export default function AddUserExercise() {
  const [users, setUsers] = useState<User[]>(mockUsers.slice(0, 4));
  const [values, setValues] = useState<AddUserFormValues>(initialValues);
  const [errors, setErrors] = useState<AddUserFormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(
      values,
      users.map((user) => user.email.toLowerCase()),
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser: User = {
      id: nextId,
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      department: values.department,
      role: 'Staff',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    setUsers((current) => [newUser, ...current]);
    setValues(initialValues);
    setErrors({});
  }

  function inputClasses(hasError: boolean) {
    return `mt-1 w-full rounded-md border px-3 py-2 text-sm ${hasError ? 'border-red-400' : 'border-slate-300'}`;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <label htmlFor="ex6-name" className="block text-sm font-medium text-slate-700">Full name *</label>
          <input
            id="ex6-name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName)}
            className={inputClasses(Boolean(errors.fullName))}
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="ex6-email" className="block text-sm font-medium text-slate-700">Email *</label>
          <input
            id="ex6-email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            className={inputClasses(Boolean(errors.email))}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="ex6-dept" className="block text-sm font-medium text-slate-700">Department</label>
          <select
            id="ex6-dept"
            name="department"
            value={values.department}
            onChange={handleChange}
            className={inputClasses(false)}
          >
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Add user
        </button>
      </form>

      <section>
        <h3 className="mb-2 text-sm font-semibold text-slate-700">Users ({users.length})</h3>
        <SimpleUserList users={users} />
      </section>
    </div>
  );
}
