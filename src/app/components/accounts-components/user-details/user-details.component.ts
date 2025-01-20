import { Component, effect, inject, model, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-details',
  imports: [ MaterialUiModule ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {

  user = inject(UsersService);

  userDetailForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    code: new FormControl(null),
    firstName: new FormControl(null, [ Validators.required ]),
    lastName: new FormControl(null, [ Validators.required ]),
    email: new FormControl(null, [ Validators.required ]),
    mobile: new FormControl(null, [ Validators.required ]),
    status: new FormControl(null, [ Validators.required ]),
    role: new FormControl(null, [ Validators.required ]),
    lastUpdate: new FormControl(null, [ Validators.required ])
  });

  constructor() { 
    effect(() => {
      const userDetails: any = this.user.selectedUser();      
      if (userDetails) this.userDetailForm.patchValue(userDetails);

      if (!this.user.isDrawer()) this.userDetailForm.reset();
    })    
  }
  
  get lastUpdate() {
    const lastUpdateValue = this.userDetailForm.get('lastUpdate')?.value;
    return lastUpdateValue ? new Date(lastUpdateValue).toLocaleString() : '';
  }

}
