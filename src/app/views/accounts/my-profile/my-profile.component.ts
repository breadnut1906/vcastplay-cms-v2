import { Component, computed, effect, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersService } from '../../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../../../models/account-settings';

@Component({
  selector: 'app-my-profile',
  imports: [ MaterialUiModule ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
  providers: [ UsersService ],
})
export class MyProfileComponent {

  user = inject(UsersService);

  profile = computed(() => this.user.users().find(user => user.id == 1));

  editProfile = signal<boolean>(false);

  userForm: FormGroup = new FormGroup({
    id: new FormControl(0, [ Validators.required ]),
    code: new FormControl('', [ Validators.required ]),
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),
    email: new FormControl('', [ Validators.required ]),
    mobile: new FormControl(0, [ Validators.required ]),
    role: new FormControl('', [ Validators.required ]),
    status: new FormControl(''),
    lastUpdate: new FormControl(''),
  })

  constructor() {
    effect(() => {
      const profile: Users | any = this.profile();
      this.userForm.patchValue(profile);

      if (this.editProfile()) {
        this.userForm.enable();
      } else {
        this.userForm.disable();
      }
    })
  }
}
