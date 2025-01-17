import { computed, Injectable, signal } from '@angular/core';
import { Roles, Users } from '../models/account-settings';

@Injectable()
export class UsersService {

  userTableColumns: string[] = [ 'code', 'name', 'email', 'mobile', 'role', 'lastUpdate', 'status', 'actions' ];
  rolesTableColumns: string[] = [ 'name', 'description', 'lastUpdate', 'status', 'actions' ];

  users = signal<Users[]>([
    {
      id: 1,
      code: "U001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobile: 1234567890,
      role: "Admin",
      status: "Active",
      lastUpdate: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      code: "U002",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      mobile: 9876543210,
      role: "Editor",
      status: "Inactive",
      lastUpdate: "2025-01-12T08:15:00Z"
    },
    {
      id: 3,
      code: "U003",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      mobile: 1122334455,
      role: "Viewer",
      status: "Active",
      lastUpdate: "2025-01-10T14:00:00Z"
    },
    {
      id: 4,
      code: "U004",
      firstName: "Bob",
      lastName: "Brown",
      email: "bob.brown@example.com",
      mobile: 9988776655,
      role: "Admin",
      status: "Suspended",
      lastUpdate: "2025-01-14T16:45:00Z"
    },
    {
      id: 5,
      code: "U005",
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      mobile: 5566778899,
      role: "Contributor",
      status: "Active",
      lastUpdate: "2025-01-11T09:20:00Z"
    }
  ])

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
}
