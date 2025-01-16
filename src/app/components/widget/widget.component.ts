import { Component, inject, input, signal } from '@angular/core';
import { Widget } from '../../models/widget';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-widget',
  imports: [ MaterialUiModule ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
  host: {
    '[style.grid-area]': '"span " + (data().rows ?? 1) + "/ span " + (data().columns ?? 1)',
  }
})
export class WidgetComponent {

  // Input parameter
  // Inputs all component. This serves as container for the component
  data = input.required<Widget>();
  store = inject(DashboardService);

  showOptions = signal(false);
}
