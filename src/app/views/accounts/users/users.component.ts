import { Component, effect, inject, model, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { UsersService } from '../../../services/users.service';
import { UtilityService } from '../../../services/utility.service';
import { ComponentsModule } from '../../../modules/components/components.module';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'app-users',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [ UsersService ]
})
export class UsersComponent {
  
  user = inject(UsersService);
  showFilter = model<boolean>(false);
  dateRangeValue = signal<any>({ start: moment().toISOString(), end: moment().toISOString(), label: 'Today' });

  searchUser: FormGroup = new FormGroup({
    dateRange: new FormControl(null),
    role: new FormControl(null),
    status: new FormControl(null),
    keyword: new FormControl(null),
  })

  constructor(public utility: UtilityService) {
    effect(() => {
      this.searchUser.patchValue({ dateRange: this.dateRangeValue() });      
    })
  }

  ngOnInit() { }

}
