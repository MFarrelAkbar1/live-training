import { useState, type FormEvent } from 'react';
import type { Department, Role, UserFormErrors, UserFormValues, UserStatus } from '../../types';
import { DEPARTMENTS, ROLES } from '../../data/constants';
import { hasErrors, validateUserForm } from '../../utils/validation';
import { Button } from '../common/Button';

interface UserFormProps {
  initialValues?: UserFormValues;
  /** Lower-cased emails of OTHER users, used for the duplicate check. */
  existingEmails: string[];
  submitLabel: string;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
}

const emptyValues: UserFormValues = {
  fullName: '',
  email: '',
  department: 'Engineering',
  role: 'Staff',
  status: 'active',
};

const inputBaseClasses =
  'mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1';

function inputClasses(hasError: boolean): string {
  return `${inputBaseClasses} ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
  }`;
}

/**
 * Controlled form used for both "create" and "edit".
 * The parent should pass a `key` (e.g. the user id) so the form state resets
 * when switching between different users.
 */
export function UserForm({
  initialValues = emptyValues,
  existingEmails,
  submitLabel,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [values, setValues] = useState<UserFormValues>(initialValues);
  const [errors, setErrors] = useState<UserFormErrors>({});

  // Generic, type-safe field updater: `value` must match the field's type.
  function updateField<K extends keyof UserFormValues>(field: K, value: UserFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    // Clear the error for this field as soon as the person edits it.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page

    const validationErrors = validateUserForm(values, existingEmails);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={values.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
          className={inputClasses(Boolean(errors.fullName))}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          autoFocus
        />
        {errors.fullName && (
          <p id="fullName-error" className="mt-1 text-xs text-red-600">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(event) => updateField('email', event.target.value)}
          className={inputClasses(Boolean(errors.email))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-700">
            Department
          </label>
          <select
            id="department"
            value={values.department}
            onChange={(event) => updateField('department', event.target.value as Department)}
            className={inputClasses(false)}
          >
            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            id="role"
            value={values.role}
            onChange={(event) => updateField('role', event.target.value as Role)}
            className={inputClasses(false)}
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="block text-sm font-medium text-slate-700">Status</legend>
        <div className="mt-2 flex gap-6">
          {(['active', 'inactive'] as UserStatus[]).map((status) => (
            <label key={status} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="radio"
                name="status"
                value={status}
                checked={values.status === status}
                onChange={() => updateField('status', status)}
                className="h-4 w-4 accent-blue-600"
              />
              {status === 'active' ? 'Active' : 'Inactive'}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
