import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget.component';
import { WidgetPanelComponent } from '../../components/dashboard-components/widget-panel/widget-panel.component';
import { DaterangepickerComponent } from '../../components/daterangepicker/daterangepicker.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DaterangepickerComponent,
    WidgetComponent,
    WidgetPanelComponent,
  ],
  exports: [
    DaterangepickerComponent,
    WidgetComponent,
    WidgetPanelComponent,
  ]
})
export class ComponentsModule { }
