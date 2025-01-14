import { Component } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { ComponentsModule } from '../../modules/components/components.module';
import { Widget } from '../../models/widget';

@Component({
  selector: 'app-dashboard',
  imports: [ MaterialUiModule, ComponentsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  
  data: Widget = {
    id: 1,
    label: 'Viewers',
    content
  }
}
