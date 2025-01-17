import { Component, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersComponent } from '../users/users.component';
import { RolesComponent } from '../roles/roles.component';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-account-settings',
  imports: [ MaterialUiModule, UsersComponent, RolesComponent ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
  providers: [ UtilityService ]
})
export class AccountSettingsComponent {

  showFilter = signal<boolean>(false);
  
}
