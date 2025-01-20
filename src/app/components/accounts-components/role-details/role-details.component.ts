import { Component, effect, inject } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersService } from '../../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-details',
  imports: [ MaterialUiModule ],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.scss'
})
export class RoleDetailsComponent {

  user = inject(UsersService);
  
  roleDetailForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [ Validators.required ]),
    description: new FormControl(null, [ Validators.required ]),
    modules: new FormControl([], [ Validators.required ]),
    status: new FormControl(null, [ Validators.required ]),
    lastUpdate: new FormControl(null, [ Validators.required ]),
  });

  constructor() { 
    effect(() => {
      const roleDetails: any = this.user.selectedRole();      
      if (roleDetails) this.roleDetailForm.patchValue(roleDetails);

      if (!this.user.isDrawer()) this.roleDetailForm.reset();
    })    
  }
  
  get lastUpdate() {
    const lastUpdateValue = this.roleDetailForm.get('lastUpdate')?.value;
    return lastUpdateValue ? new Date(lastUpdateValue).toLocaleString() : '';
  }

}
