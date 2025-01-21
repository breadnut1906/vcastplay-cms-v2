import { Component, effect, inject } from '@angular/core';
import { MaterialUiModule } from '../../../modules/material-ui/material-ui.module';
import { MapComponent } from '../../map/map.component';
import { ScreenService } from '../../../services/screen.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-screen-details',
  imports: [ MaterialUiModule, MapComponent ],
  templateUrl: './screen-details.component.html',
  styleUrl: './screen-details.component.scss'
})
export class ScreenDetailsComponent {

  screen = inject(ScreenService);
  utility = inject(UtilityService);

  screenForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    code: new FormControl(''),
    name: new FormControl(''),
    type: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zipCode: new FormControl(''),
      lat: new FormControl(0),
      lng: new FormControl(0),
    }),
    group: new FormControl(''),
    subGroup: new FormControl(''),
    orientation: new FormGroup({
      orientation: new FormControl(''),
      resolution: new FormControl(''),
    }),
    schedule: new FormGroup({
      type: new FormControl(''),
      hours: new FormGroup({
        start: new FormControl(''),
        end: new FormControl(''), 
      }),
    }),
    geographic: new FormGroup({
      location: new FormControl(''),
      landmark: new FormControl(''),
    }),
    caltonSerial: new FormControl(''),
  })

  constructor() { 
    effect(() => {
      if (this.screen.isEditMode()) {   
        // Update screen form fields with selected screen data       
        this.screenForm.patchValue({...this.screen.selectedScreen()});
      }

      if (!this.screen.isEditMode()) {
        this.screenForm.reset();

        // Set default values for new screen form
        this.utility.onGetUserLocation().then((location: any) => {
          const coords = location.coords;
          if (coords) {            
            this.screenForm.patchValue({ address: { lat: coords.latitude, lng: coords.longitude }});
            this.screen.selectedScreen.set({ ...this.screenForm.value });
          }
        });
      }

      // Reset form if drawer is closed  
      if (!this.screen.isDrawer()) this.screenForm.reset();
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const screenDetails: any = this.screen.selectedScreen();
    this.screenForm.patchValue(screenDetails);    
  }
}
