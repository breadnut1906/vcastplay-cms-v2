import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from '../../components/widget/widget.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WidgetComponent,
  ],
  exports: [
    WidgetComponent,
  ]
})
export class ComponentsModule { }
