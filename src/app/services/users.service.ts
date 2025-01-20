import { computed, effect, Injectable, signal } from '@angular/core';
import { Roles, Users } from '../models/account-settings';

@Injectable()
export class UsersService {

  // Trigger when the sidebar is opened or closed
  isDrawer = signal<boolean>(false);

  // get the current tabindex
  selectedTab = signal<number>(0);

  users = signal<Users[]>([]);
  
  roleLists = signal<Roles[]>([]);

  userRoles = computed(() => [...new Set(this.users().map(w => w.role))]);
  userStatus = computed(() => [...new Set(this.users().map(w => w.status))]);

  roles = computed(() => [...new Set(this.roleLists().map(w => w.name))]);
  roleStatus = computed(() => [...new Set(this.roleLists().map(w => w.status))]);

  selectedUser = signal<Users | null>(null);
  selectedRole = signal<Roles | null>(null);

  constructor() { }

  ////////////////////////////////////////////////////////////////
  /**User Methods */
  ////////////////////////////////////////////////////////////////

  onAddUsers(user: Users[]) {
    // Call Api Here??
    this.users.set(user)
  }

  onEditUser(user: Users) {    
    this.selectedUser.set(user);
    this.isDrawer.set(true);
  }

  onSaveUser() {
    this.isDrawer.set(false);
    this.selectedUser.set(null);
  }

  ////////////////////////////////////////////////////////////////
  /**Role Methods */
  ////////////////////////////////////////////////////////////////

  onAddRoles(role: Roles[]) {
    // Call Api Here??
    this.roleLists.set(role);
  }

  onEditRole(role: Roles) {
    this.selectedRole.set(role);
    this.isDrawer.set(true);
  }

  onSaveRole() {
    this.isDrawer.set(false);
    this.selectedRole.set(null);
  }

}
