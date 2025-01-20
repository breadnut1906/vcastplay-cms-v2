import { Component, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersComponent } from '../users/users.component';
import { RolesComponent } from '../roles/roles.component';
import { UtilityService } from '../../../services/utility.service';
import { UserDetailsComponent } from '../../../components/user-details/user-details.component';
import { UsersService } from '../../../services/users.service';
import { RoleDetailsComponent } from '../../../components/role-details/role-details.component';
@Component({
  selector: 'app-account-settings',
  imports: [ MaterialUiModule, UsersComponent, UserDetailsComponent, RolesComponent, RoleDetailsComponent ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
  providers: [ UtilityService, UsersService ]
})
export class AccountSettingsComponent {

  user = inject(UsersService);
  showFilter = signal<boolean>(false);

  constructor() { }
}
