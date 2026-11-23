import { useEffect, useState } from 'react';
import type { User, UserFormValues } from '../types';
import { fetchUsers } from '../services/userService';
import { mockUsers } from '../data/mockUsers';

/**
 * Owns the list of users: initial fetch, loading/error state, and local CRUD.
 *
 * JSONPlaceholder does not persist writes, so after the initial fetch every
 * create / update / delete happens only in React state (immutable updates).
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  // Changing this number re-runs the fetch effect. That's how "Retry" works.
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    // AbortController cancels the request if the component unmounts
    // (or the effect re-runs) before the response arrives.
    const controller = new AbortController();

    async function loadUsers() {
      setIsLoading(true);
      setError(null);

      try {
        const fetchedUsers = await fetchUsers(controller.signal);
        setUsers(fetchedUsers);
        setIsUsingMockData(false);
      } catch (caughtError) {
        if (controller.signal.aborted) return;
        const message =
          caughtError instanceof Error ? caughtError.message : 'Something went wrong.';
        setError(`Unable to load users. ${message}`);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadUsers();

    return () => controller.abort();
  }, [reloadCount]);

  function retry() {
    setReloadCount((count) => count + 1);
  }

  function loadMockData() {
    setUsers(mockUsers);
    setError(null);
    setIsUsingMockData(true);
  }

  function addUser(values: UserFormValues) {
    const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser: User = {
      ...values,
      id: nextId,
      createdAt: new Date().toISOString(),
    };
    // New array instead of users.push(...) — React needs a new reference to re-render.
    setUsers((currentUsers) => [newUser, ...currentUsers]);
  }

  function updateUser(id: number, values: UserFormValues) {
    setUsers((currentUsers) =>
      currentUsers.map((user) => (user.id === id ? { ...user, ...values } : user)),
    );
  }

  function deleteUser(id: number) {
    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== id));
  }

  function toggleUserStatus(id: number) {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user,
      ),
    );
  }

  return {
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
  };
}
