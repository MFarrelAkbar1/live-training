import { useState } from 'react';
import { Database } from 'lucide-react';
import { useUsers } from './hooks/useUsers';
import { AppLayout } from './components/layout/AppLayout';
import type { PageId } from './components/layout/navigation';
import { Button } from './components/common/Button';
import { ErrorState, LoadingState } from './components/common/StateViews';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const {
    users,
    isLoading,
    error,
    isUsingMockData,
    retry,
    loadMockData,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
  } = useUsers();

  function renderContent() {
    if (isLoading) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white">
          <LoadingState />
        </div>
      );
    }

    if (error) {
      return (
        <div className="rounded-lg border border-slate-200 bg-white">
          <ErrorState
            message={error}
            onRetry={retry}
            extraAction={
              <Button variant="secondary" icon={<Database className="h-4 w-4" />} onClick={loadMockData}>
                Use sample data
              </Button>
            }
          />
        </div>
      );
    }

    if (activePage === 'dashboard') {
      return <DashboardPage users={users} onViewAllUsers={() => setActivePage('users')} />;
    }

    return (
      <UsersPage
        users={users}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
        onToggleStatus={toggleUserStatus}
      />
    );
  }

  return (
    <AppLayout activePage={activePage} onNavigate={setActivePage} isUsingMockData={isUsingMockData}>
      {renderContent()}
    </AppLayout>
  );
}
