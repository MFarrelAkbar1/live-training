import { ShieldCheck, WifiOff } from 'lucide-react';
import { NAV_ITEMS, type PageId } from './navigation';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isUsingMockData: boolean;
}

export function Header({ activePage, onNavigate, isUsingMockData }: HeaderProps) {
  const activeItem = NAV_ITEMS.find((item) => item.id === activePage);

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600 md:hidden" />
          <h1 className="text-lg font-semibold text-slate-900">{activeItem?.label}</h1>
        </div>

        <div className="flex items-center gap-3">
          {isUsingMockData && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
              <WifiOff className="h-3.5 w-3.5" />
              Offline sample data
            </span>
          )}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white"
            title="Signed in as IT Administrator"
          >
            IT
          </div>
        </div>
      </div>

      {/* Mobile navigation: the sidebar is hidden below the md breakpoint. */}
      <nav aria-label="Mobile navigation" className="flex gap-1 px-4 pb-2 md:hidden">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={item.id === activePage ? 'page' : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              item.id === activePage ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
