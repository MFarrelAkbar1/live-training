import { UserCheck, UserPlus, Users, UserX } from 'lucide-react';
import type { User } from '../types';
import { DEPARTMENTS, RECENT_DAYS } from '../data/constants';
import { isRecentlyAdded } from '../utils/format';
import { StatCard } from '../components/common/StatCard';
import { RecentUsers } from '../components/users/RecentUsers';

interface DashboardPageProps {
  users: User[];
  onViewAllUsers: () => void;
}

export function DashboardPage({ users, onViewAllUsers }: DashboardPageProps) {
  // Derived values: computed from props on every render, NOT stored in state.
  const activeCount = users.filter((user) => user.status === 'active').length;
  const inactiveCount = users.length - activeCount;
  const recentUsers = users.filter((user) => isRecentlyAdded(user.createdAt));

  // Newest first, top 5. Copy before sorting so we don't mutate props.
  const latestUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const departmentCounts = DEPARTMENTS.map((department) => ({
    department,
    count: users.filter((user) => user.department === department).length,
  }));

  return (
    <div className="space-y-6">
      <section aria-label="User statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={users.length} icon={<Users className="h-5 w-5" />} description="All registered accounts" />
        <StatCard label="Active Users" value={activeCount} icon={<UserCheck className="h-5 w-5" />} description="Can sign in to systems" />
        <StatCard label="Inactive Users" value={inactiveCount} icon={<UserX className="h-5 w-5" />} description="Access currently disabled" />
        <StatCard label="Recently Added" value={recentUsers.length} icon={<UserPlus className="h-5 w-5" />} description={`Joined in the last ${RECENT_DAYS} days`} />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white lg:col-span-2">
          <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Latest users</h2>
            <button
              type="button"
              onClick={onViewAllUsers}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all
            </button>
          </header>
          <RecentUsers users={latestUsers} />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white">
          <header className="border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Users by department</h2>
          </header>
          <table className="w-full text-sm">
            <thead className="sr-only">
              <tr>
                <th scope="col">Department</th>
                <th scope="col">Users</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departmentCounts.map(({ department, count }) => (
                <tr key={department}>
                  <td className="px-5 py-3 text-slate-600">{department}</td>
                  <td className="px-5 py-3 text-right font-medium tabular-nums text-slate-900">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
