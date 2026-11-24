import type { ApiUser, Department, Role, User, UserStatus } from '../types';
import { DEPARTMENTS, ROLES } from '../data/constants';

export const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * JSONPlaceholder has no department / role / status / createdAt fields,
 * so we derive deterministic values from the user id. Same id -> same values,
 * which keeps the UI stable across reloads.
 */
function mapApiUserToUser(apiUser: ApiUser): User {
  const department: Department = DEPARTMENTS[apiUser.id % DEPARTMENTS.length];
  const role: Role = ROLES[apiUser.id % ROLES.length];
  const status: UserStatus = apiUser.id % 4 === 0 ? 'inactive' : 'active';

  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - apiUser.id * 9);

  return {
    id: apiUser.id,
    fullName: apiUser.name,
    email: apiUser.email.toLowerCase(),
    department,
    role,
    status,
    createdAt: createdAt.toISOString(),
  };
}

/**
 * Fetches users from JSONPlaceholder and maps them to our domain model.
 * Throws an Error with a readable message on network or HTTP failure.
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_API_URL, { signal });

  // fetch() only rejects on network errors, NOT on 404/500, so check `ok` ourselves.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: ApiUser[] = await response.json();
  return data.map(mapApiUserToUser);
}
