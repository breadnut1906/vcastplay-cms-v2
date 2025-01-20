import { Component, effect, inject, model, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersService } from '../../../services/users.service';
import { UtilityService } from '../../../services/utility.service';
import { ComponentsModule } from '../../../modules/components/components.module';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from '../../../models/account-settings';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';

@Component({
  selector: 'app-users',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  
  showFilter = model<boolean>(false);
  
  user = inject(UsersService);

  dateRangeValue = signal<any>({ start: moment().toISOString(), end: moment().toISOString(), label: 'Today' });

  searchUser: FormGroup = new FormGroup({
    dateRange: new FormControl(null),
    role: new FormControl(null),
    status: new FormControl(null),
    keyword: new FormControl(null),
  })

  userTableColumns: string[] = [ 'code', 'name', 'email', 'mobile', 'role', 'lastUpdate', 'status', 'actions' ];
  USERS_DATASOURCE: MatTableDataSource<Users> = new MatTableDataSource<Users>([]);

  constructor(public utility: UtilityService) {
    effect(() => {
      this.searchUser.patchValue({ dateRange: this.dateRangeValue() });      
    })
  }

  ngOnInit() {
    this.onFetchUsers();
    // this.USERS_DATASOURCE.data = this.user.users();
  }

  onFetchUsers() {
    this.user.onAddUsers([
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
    ]);

    this.USERS_DATASOURCE.data = this.user.users();
  }
}
