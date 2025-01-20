import { Component, effect, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { UtilityService } from '../../../services/utility.service';
import { UsersService } from '../../../services/users.service';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../../modules/components/components.module';
import { MatTableDataSource } from '@angular/material/table';
import { Roles } from '../../../models/account-settings';

@Component({
  selector: 'app-roles',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {

  user = inject(UsersService);
  showFilter = model<boolean>(false);

  searchRole: FormGroup = new FormGroup({
    role: new FormControl(null),
    status: new FormControl(null),
    keyword: new FormControl(null),
  })

  rolesTableColumns: string[] = [ 'name', 'description', 'lastUpdate', 'status', 'actions' ];
  ROLES_DATASOURCE: MatTableDataSource<Roles> = new MatTableDataSource<Roles>([]); 

  constructor(public utility: UtilityService) { }

  ngOnInit() { 
    this.onFetchRoles();
    // this.ROLES_DATASOURCE.data = this.user.roleLists();
  }

  onFetchRoles() {
    this.user.onAddRoles([
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
    ])
    
    this.ROLES_DATASOURCE.data = this.user.roleLists();
  }

}
