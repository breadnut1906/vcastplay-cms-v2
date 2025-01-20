import { Component, inject } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { ScreenService } from '../../services/screen.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-screen-details',
  imports: [ MaterialUiModule, MapComponent ],
  templateUrl: './screen-details.component.html',
  styleUrl: './screen-details.component.scss'
})
export class ScreenDetailsComponent {

  screen = inject(ScreenService);

}
