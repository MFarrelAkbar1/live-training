import type { UserFormErrors, UserFormValues } from '../types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/**
 * Validates the user form. Returns an object containing only the fields that
 * have errors, so an empty object means the form is valid.
 *
 * `existingEmails` should already be lower-cased and must NOT include the email
 * of the user currently being edited.
 */
export function validateUserForm(
  values: UserFormValues,
  existingEmails: string[] = [],
): UserFormErrors {
  const errors: UserFormErrors = {};

  if (values.fullName.trim() === '') {
    errors.fullName = 'Full name is required.';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters.';
  }

  if (values.email.trim() === '') {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (existingEmails.includes(values.email.trim().toLowerCase())) {
    errors.email = 'This email is already used by another user.';
  }

  return errors;
}

export function hasErrors(errors: UserFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
