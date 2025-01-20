import { Component, inject, signal } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { ScreenService } from '../../services/screen.service';
import { MatTableDataSource } from '@angular/material/table';
import { Screen } from '../../models/screen';
import { UtilityService } from '../../services/utility.service';
import { ComponentsModule } from '../../modules/components/components.module';
import { ScreenDetailsComponent } from '../../components/screen-details/screen-details.component';

@Component({
  selector: 'app-screen-registration',
  imports: [ MaterialUiModule, ComponentsModule, ScreenDetailsComponent ],
  templateUrl: './screen-registration.component.html',
  styleUrl: './screen-registration.component.scss',
  providers: [ UtilityService, ScreenService ],
})
export class ScreenRegistrationComponent {

  screen = inject(ScreenService);
  utility = inject(UtilityService);
  showFilter = signal<boolean>(false);

  displayColumns: string[] = [ 'code', 'name', 'type', 'orientation', 'group', 'subGroup', 'lastUpdate', 'status', 'actions']
  SCREEN_DATASOURCE: MatTableDataSource<Screen> = new MatTableDataSource<Screen>();

  ngOnInit() {
    this.screen.onFetchScreens();
    this.SCREEN_DATASOURCE.data = this.screen.screens();    
  }

}
