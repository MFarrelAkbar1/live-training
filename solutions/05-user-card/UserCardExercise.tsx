/**
 * SOLUTION — Exercise 5: Reusable UserCard
 *
 * Key points:
 *  - Presentational component: data in via props, events out via callbacks.
 *  - Optional props (`onSelect?`) make the component reusable in read-only AND interactive contexts.
 *  - When clickable, we render a real <button> so keyboard users get focus + Enter/Space for free.
 */
import { useState, type ReactNode } from 'react';
import type { User } from '../../src/types';
import { mockUsers } from '../../src/data/mockUsers';

interface UserCardProps {
  user: User;
  isSelected?: boolean;
  onSelect?: (user: User) => void;
}

export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function UserCard({ user, isSelected = false, onSelect }: UserCardProps) {
  const isActive = user.status === 'active';

  const content: ReactNode = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {getInitials(user.fullName)}
          </span>
          <div>
            <h3 className="font-medium text-slate-900">{user.fullName}</h3>
            <p className="text-xs text-slate-500">{user.role}</p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
            isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-slate-400">Email</dt>
        <dd className="truncate text-slate-700">{user.email}</dd>
        <dt className="text-slate-400">Dept.</dt>
        <dd className="text-slate-700">{user.department}</dd>
      </dl>
    </>
  );

  const cardClasses = `block w-full rounded-lg border bg-white p-4 text-left ${
    isSelected ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200'
  }`;

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(user)}
        aria-pressed={isSelected}
        className={`${cardClasses} hover:border-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
      >
        {content}
      </button>
    );
  }

  return <article className={cardClasses}>{content}</article>;
}

export default function UserCardExercise() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Selected user id: <strong>{selectedUserId ?? 'none'}</strong>
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={user.id === selectedUserId}
            onSelect={(clickedUser) => setSelectedUserId(clickedUser.id)}
          />
        ))}
      </div>
    </div>
  );
}
