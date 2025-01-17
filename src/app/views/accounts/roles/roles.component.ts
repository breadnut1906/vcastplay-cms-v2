import { Component, effect, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { UtilityService } from '../../../services/utility.service';
import { UsersService } from '../../../services/users.service';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../../modules/components/components.module';

@Component({
  selector: 'app-roles',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  providers: [ UsersService ]
})
export class RolesComponent {

  user = inject(UsersService);
  showFilter = model<boolean>(false);

  searchRole: FormGroup = new FormGroup({
    role: new FormControl(null),
    status: new FormControl(null),
    keyword: new FormControl(null),
  })

  constructor(public utility: UtilityService) { }

  ngOnInit() { }

}
