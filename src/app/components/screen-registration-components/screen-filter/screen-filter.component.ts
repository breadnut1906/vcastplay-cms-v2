import { Component, effect, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../../modules/components/components.module';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-screen-filter',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './screen-filter.component.html',
  styleUrl: './screen-filter.component.scss'
})
export class ScreenFilterComponent {

  showOthers = signal<boolean>(false);
  screen = inject(ScreenService);

  dateRangeValue = signal<any>({ start: moment().toISOString(), end: moment().toISOString(), label: 'Today' });

  types: string[] = ['WebApp', 'Windows', 'Android',];

  filterForm: FormGroup = new FormGroup({
    dateRange: new FormControl(null),
    location: new FormControl(null),
    group: new FormControl(null),
    subGroup: new FormControl(null),
    type: new FormControl(null),
    status: new FormControl(null),
    keyword: new FormControl(''),
  })

  constructor() {      
    this.filterForm.valueChanges.subscribe((data) => {
      this.screen.screeFilters.set(data);
    }); 
  }

  ngOnInit() {
    this.filterForm.patchValue({ dateRange: this.dateRangeValue() });      
    this.screen.screeFilters.set(this.filterForm.value);
  }

  get keyword() {
    return this.filterForm.get('keyword')?.value;
  }
}
