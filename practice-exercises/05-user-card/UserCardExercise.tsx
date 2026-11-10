/**
 * EXERCISE 5 — Build a reusable UserCard component        Difficulty: Easy
 *
 * Goal: create a presentational <UserCard /> and render a grid of them.
 *
 * Requirements for UserCard:
 *  - Props are described by a TypeScript interface (UserCardProps).
 *  - Shows: initials avatar, full name, email, department, role, status badge.
 *  - Status badge is green for active, grey for inactive.
 *  - Optional `onSelect` prop: when provided, the card is clickable (use a <button>
 *    or add role/keyboard support) and calls onSelect(user).
 *  - Optional `isSelected` prop highlights the card (e.g. blue border).
 *  - The card must NOT fetch or own any data — it only renders props.
 */
import { useState } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

// TODO 1: Define the props interface.
interface UserCardProps {
  user: User;
  // TODO: add optional `onSelect` and `isSelected` props
}

export function getInitials(fullName: string): string {
  // TODO 2: "Leanne Graham" → "LG". Hint: split(' '), take first letters of the first two parts.
  return '?';
}

export function UserCard({ user }: UserCardProps) {
  // TODO 3: Build the card UI (use semantic HTML: <article>, <h3>, <dl>/<dt>/<dd>).
  // TODO 4: Render the status badge with conditional classes.
  // TODO 5: If onSelect exists, make the card clickable.
  return (
    <article className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-400">
      TODO: UserCard for {user.fullName}
    </article>
  );
}

export default function UserCardExercise() {
  // TODO 6: Track the selected user id in state (number | null).
  const selectedUserId: number | null = null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Selected user id: <strong>{selectedUserId ?? 'none'}</strong>
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* TODO 7: Pass isSelected and onSelect to each card. Remember the `key` prop! */}
        {mockUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
