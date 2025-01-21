import { Component, model } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { FormControl } from '@angular/forms';
import moment from 'moment';

declare const $: any; // To avoid TypeScript errors for jQuery

@Component({
  selector: 'app-daterangepicker',
  imports: [ MaterialUiModule ],
  templateUrl: './daterangepicker.component.html',
  styleUrl: './daterangepicker.component.scss'
})
export class DaterangepickerComponent {

  dateRangeControl: FormControl = new FormControl(null);
  dateRangeValue = model<any>({});

  constructor() { }

  ngOnInit() {
    const dateRangeInput = $('#dateRange');
    if (dateRangeInput.length) {
      const range = this.dateRangeControl?.value; 
      dateRangeInput.daterangepicker({
        opens: 'left',
        startDate: moment(range?.start),
        endDate: moment(range?.end),
        maxDate: moment(),
        ranges: {
          'Today': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Week': [moment().startOf('week'), moment().endOf('week')],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last 3 Months': [moment().subtract(3, 'months').startOf('month'), moment().endOf('month')],
        }
      }, (start: any, end: any, label: any) => {
        const event: any = { start: start.toISOString(), end: end.toISOString(), label }
        this.dateRangeValue.set(event)
      });
    }
  }
}
