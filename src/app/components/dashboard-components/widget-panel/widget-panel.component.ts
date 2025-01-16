import { Component, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-widget-panel',
  imports: [ MaterialUiModule ],
  templateUrl: './widget-panel.component.html',
  styleUrl: './widget-panel.component.scss'
})
export class WidgetPanelComponent {

  store = inject(DashboardService);
}
