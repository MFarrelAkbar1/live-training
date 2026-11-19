import { LayoutDashboard, Users, type LucideIcon } from 'lucide-react';

export type PageId = 'dashboard' | 'users';

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'User Management', icon: Users },
];
