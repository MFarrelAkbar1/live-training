import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { PageId } from './navigation';

interface AppLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isUsingMockData: boolean;
  children: ReactNode;
}

/** Composition: the layout doesn't know which page it renders — it just receives `children`. */
export function AppLayout({ activePage, onNavigate, isUsingMockData, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header activePage={activePage} onNavigate={onNavigate} isUsingMockData={isUsingMockData} />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
