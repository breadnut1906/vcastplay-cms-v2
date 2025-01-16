import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget.component';
import { WidgetPanelComponent } from '../../components/dashboard-components/widget-panel/widget-panel.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WidgetComponent,
    WidgetPanelComponent,
  ],
  exports: [
    WidgetComponent,
    WidgetPanelComponent,
  ]
})
export class ComponentsModule { }
