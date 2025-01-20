import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  private map: L.Map | undefined;
  private zoomOptions: L.MapOptions = {
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: false,
  }

  address = input.required<any>();
  screenMap = viewChild.required<ElementRef>('screenMap');

  constructor() { 
    effect(() => {
      if (this.address()) this.onInitializeMap();
    })
  }

  ngOnInit() {  }

  onInitializeMap() {    
    if (this.map) this.map.remove();
    this.map = L.map(this.screenMap().nativeElement, this.zoomOptions).setView([ 14.576035, 121.050496 ], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Manually set the path for the marker icon
    const markerIcon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Adjust path if needed
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/marker-shadow.png', // Optional, for shadow
      shadowSize: [41, 41]
    });

    L.marker([this.address().lat, this.address().lng ], { icon: markerIcon }).addTo(this.map);
    this.map.setView([this.address().lat, this.address().lng ], 13);
  }
}
