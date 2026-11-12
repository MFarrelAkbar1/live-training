import { getInitials } from '../../utils/format';

export function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700"
    >
      {getInitials(name)}
    </span>
  );
}
