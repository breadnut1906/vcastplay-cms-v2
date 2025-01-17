import { computed, effect, Injectable, signal } from '@angular/core';
import { Roles, Users } from '../models/account-settings';

@Injectable()
export class UsersService {

  userTableColumns: string[] = [ 'code', 'name', 'email', 'mobile', 'role', 'lastUpdate', 'status', 'actions' ];
  rolesTableColumns: string[] = [ 'name', 'description', 'lastUpdate', 'status', 'actions' ];

  selectedTab = signal<number>(0);

  users = signal<Users[]>([])

  roleLists = signal<Roles[]>([
    {
      id: 1,
      name: "Admin",
      description: "Has full access to all features and settings.",
      modules: [
        { name: "Dashboard" },
        { name: "User Management" },
        { name: "Settings" },
        { name: "Reports" }
      ],
      status: "Active",
      lastUpdate: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Editor",
      description: "Can edit and publish content but has limited settings access.",
      modules: [
        { name: "Dashboard" },
        { name: "Content Management" },
        { name: "Reports" }
      ],
      status: "Active",
      lastUpdate: "2025-01-15T10:30:00Z"
    },
    {
      id: 3,
      name: "Viewer",
      description: "Can only view content and reports.",
      modules: [
        { name: "Dashboard" },
        { name: "Reports" }
      ],
      status: "Inactive",
      lastUpdate: "2025-01-15T10:30:00Z"
    },
    {
      id: 4,
      name: "Contributor",
      description: "Can create and manage content but not publish it.",
      modules: [
        { name: "Content Management" },
        { name: "Reports" }
      ],
      status: "Active",
      lastUpdate: "2025-01-15T10:30:00Z"
    },
    {
      id: 5,
      name: "Moderator",
      description: "Can moderate user-generated content and manage comments.",
      modules: [
        { name: "Content Management" },
        { name: "User Management" }
      ],
      status: "Suspended",
      lastUpdate: "2025-01-15T10:30:00Z"
    }
  ]);

  roles = computed(() => [...new Set(this.users().map(w => w.role))]);
  status = computed(() => [...new Set(this.users().map(w => w.status))]);

  constructor() { }

  onAddUsers(user: Users[]) {
    this.users.set(user)
  }
}
