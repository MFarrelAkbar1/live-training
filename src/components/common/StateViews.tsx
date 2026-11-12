import type { ReactNode } from 'react';
import { AlertTriangle, Inbox, Loader2, RotateCw } from 'lucide-react';
import { Button } from './Button';

export function LoadingState({ message = 'Loading users…' }: { message?: string }) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  /** Optional secondary action, e.g. "Use sample data". */
  extraAction?: ReactNode;
}

export function ErrorState({ message, onRetry, extraAction }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="rounded-full bg-red-50 p-3">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <div>
        <p className="font-medium text-slate-900">Something went wrong</p>
        <p className="mt-1 text-sm text-slate-500">{message}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onRetry} icon={<RotateCw className="h-4 w-4" />}>
          Retry
        </Button>
        {extraAction}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="rounded-full bg-slate-100 p-3">
        <Inbox className="h-6 w-6 text-slate-400" />
      </div>
      <p className="font-medium text-slate-900">{title}</p>
      {description && <p className="text-sm text-slate-500">{description}</p>}
      {action}
    </div>
  );
}
