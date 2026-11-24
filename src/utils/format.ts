import { RECENT_DAYS } from '../data/constants';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function isRecentlyAdded(isoDate: string, days: number = RECENT_DAYS): boolean {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const ageInDays = (Date.now() - new Date(isoDate).getTime()) / millisecondsPerDay;
  return ageInDays <= days;
}
