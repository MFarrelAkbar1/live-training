import { useState } from 'react';
import { Plus } from 'lucide-react';
import type {
  DepartmentFilter,
  SortDirection,
  StatusFilter,
  User,
  UserFormValues,
} from '../types';
import { PAGE_SIZE } from '../data/constants';
import {
  filterByDepartment,
  filterByStatus,
  getTotalPages,
  paginate,
  searchUsers,
  sortByName,
} from '../utils/userFilters';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Modal } from '../components/common/Modal';
import { Pagination } from '../components/common/Pagination';
import { EmptyState } from '../components/common/StateViews';
import { UserActions } from '../components/users/UserActions';
import { UserCard } from '../components/users/UserCard';
import { UserFilters } from '../components/users/UserFilters';
import { UserForm } from '../components/users/UserForm';
import { UserTable } from '../components/users/UserTable';

interface UsersPageProps {
  users: User[];
  onAddUser: (values: UserFormValues) => void;
  onUpdateUser: (id: number, values: UserFormValues) => void;
  onDeleteUser: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

/** null = no form open. Otherwise we know whether we're creating or editing (and whom). */
type FormState = { mode: 'create' } | { mode: 'edit'; user: User } | null;

export function UsersPage({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onToggleStatus,
}: UsersPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [departmentFilter, setDepartmentFilter] = useState<DepartmentFilter>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [formState, setFormState] = useState<FormState>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // ----- Derived data pipeline: search -> filter -> sort -> paginate -----
  const searchedUsers = searchUsers(users, searchQuery);
  const statusFilteredUsers = filterByStatus(searchedUsers, statusFilter);
  const filteredUsers = filterByDepartment(statusFilteredUsers, departmentFilter);
  const sortedUsers = sortByName(filteredUsers, sortDirection);

  const totalPages = getTotalPages(sortedUsers.length, PAGE_SIZE);
  // If a delete empties the last page, fall back to the new last page.
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const visibleUsers = paginate(sortedUsers, safeCurrentPage, PAGE_SIZE);

  const hasActiveFilters =
    searchQuery !== '' || statusFilter !== 'all' || departmentFilter !== 'all';

  // ----- Event handlers -----
  // Any change to the result set should send the user back to page 1.
  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  function handleStatusChange(status: StatusFilter) {
    setStatusFilter(status);
    setCurrentPage(1);
  }

  function handleDepartmentChange(department: DepartmentFilter) {
    setDepartmentFilter(department);
    setCurrentPage(1);
  }

  function handleSortToggle() {
    setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
  }

  function clearFilters() {
    setSearchQuery('');
    setStatusFilter('all');
    setDepartmentFilter('all');
    setCurrentPage(1);
  }

  function handleFormSubmit(values: UserFormValues) {
    if (formState?.mode === 'edit') {
      onUpdateUser(formState.user.id, values);
    } else {
      onAddUser(values);
      clearFilters(); // make sure the newly created user is visible
    }
    setFormState(null);
  }

  function handleConfirmDelete() {
    if (userToDelete) {
      onDeleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  }

  // Emails of every user except the one being edited (so editing yourself isn't a "duplicate").
  const editingUserId = formState?.mode === 'edit' ? formState.user.id : null;
  const otherUserEmails = users
    .filter((user) => user.id !== editingUserId)
    .map((user) => user.email.toLowerCase());

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Users</h2>
          <p className="text-sm text-slate-500">
            Manage employee accounts, roles and access status.
          </p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => setFormState({ mode: 'create' })}>
          Add user
        </Button>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white">
        <UserFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          departmentFilter={departmentFilter}
          sortDirection={sortDirection}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onDepartmentChange={handleDepartmentChange}
          onSortToggle={handleSortToggle}
        />

        {/* Conditional rendering: empty state vs. results */}
        {sortedUsers.length === 0 ? (
          users.length === 0 ? (
            <EmptyState
              title="No users yet"
              description="Get started by adding your first user."
              action={
                <Button icon={<Plus className="h-4 w-4" />} onClick={() => setFormState({ mode: 'create' })}>
                  Add user
                </Button>
              }
            />
          ) : (
            <EmptyState
              title="No matching users"
              description="Try a different search term or adjust the filters."
              action={
                hasActiveFilters && (
                  <Button variant="secondary" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )
              }
            />
          )
        ) : (
          <>
            {/* Desktop: table */}
            <div className="hidden md:block">
              <UserTable
                users={visibleUsers}
                onEdit={(user) => setFormState({ mode: 'edit', user })}
                onToggleStatus={onToggleStatus}
                onDelete={setUserToDelete}
              />
            </div>

            {/* Mobile: cards (the same reusable UserCard, with actions composed in) */}
            <ul className="space-y-3 p-4 md:hidden">
              {visibleUsers.map((user) => (
                <li key={user.id}>
                  <UserCard
                    user={user}
                    actions={
                      <UserActions
                        user={user}
                        onEdit={(selectedUser) => setFormState({ mode: 'edit', user: selectedUser })}
                        onToggleStatus={onToggleStatus}
                        onDelete={setUserToDelete}
                      />
                    }
                  />
                </li>
              ))}
            </ul>

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={sortedUsers.length}
              pageSize={PAGE_SIZE}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>

      {formState && (
        <Modal
          title={formState.mode === 'edit' ? 'Edit user' : 'Add new user'}
          onClose={() => setFormState(null)}
        >
          <UserForm
            // A different key forces React to create a fresh form (fresh state) per user.
            key={formState.mode === 'edit' ? formState.user.id : 'new'}
            initialValues={
              formState.mode === 'edit'
                ? {
                    fullName: formState.user.fullName,
                    email: formState.user.email,
                    department: formState.user.department,
                    role: formState.user.role,
                    status: formState.user.status,
                  }
                : undefined
            }
            existingEmails={otherUserEmails}
            submitLabel={formState.mode === 'edit' ? 'Save changes' : 'Create user'}
            onSubmit={handleFormSubmit}
            onCancel={() => setFormState(null)}
          />
        </Modal>
      )}

      {userToDelete && (
        <ConfirmDialog
          title="Delete user"
          message={`Are you sure you want to delete ${userToDelete.fullName}? This action cannot be undone.`}
          confirmLabel="Delete user"
          onConfirm={handleConfirmDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
}
