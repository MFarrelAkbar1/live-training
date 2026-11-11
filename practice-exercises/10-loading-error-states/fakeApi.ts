/**
 * Provided helper for Exercise 10 — you do NOT need to change this file.
 *
 * Simulates an API so you can reliably test every UI state without
 * depending on your network connection.
 */
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

export type Scenario = 'success' | 'empty' | 'error' | 'slow';

export const SCENARIOS: Scenario[] = ['success', 'empty', 'error', 'slow'];

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function fakeFetchUsers(scenario: Scenario): Promise<User[]> {
  await wait(scenario === 'slow' ? 3000 : 800);

  if (scenario === 'error') {
    throw new Error('Server responded with 500 Internal Server Error');
  }
  if (scenario === 'empty') {
    return [];
  }
  return mockUsers.slice(0, 6);
}
