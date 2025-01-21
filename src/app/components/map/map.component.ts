import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, input, viewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [ CommonModule ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {

  // height = input<string>();
  editMode = input<boolean>();
  address = input.required<any>();
  screenMap = viewChild.required<ElementRef>('screenMap');

  clickedLocation: { lat: number; lng: number } | null = null;

  private map: L.Map | undefined;
  private marker: L.Marker | null = null; // Track the single marker

  constructor() { 
    effect(() => {      
      if (this.address()) this.onInitializeMap();
    })
  }

  ngOnInit() {  }

  onInitializeMap() {    
    if (this.map) this.map.remove();
    
    const zoomOptions: L.MapOptions = {
      zoomControl: !this.editMode(),
      scrollWheelZoom: !this.editMode(),
      doubleClickZoom: !this.editMode(),
      dragging: !this.editMode(),
    }
    
    this.map = L.map(this.screenMap().nativeElement, zoomOptions).setView([ 14.576035, 121.050496 ], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Add marker if edit mode is enabled and address has latitude and longitude set
    if (this.editMode()) {
      this.onMarkerAdd(this.map, this.address().lat, this.address().lng)
    } else {
      this.map.on('click', (event: L.LeafletMouseEvent) => {
        const { lat, lng } = event.latlng;
  
        // Update the clicked location
        this.clickedLocation = { lat, lng };
        
        // Remove the existing marker if it exists
        if (this.marker && this.map) this.map.removeLayer(this.marker);
  
        // Add a new marker at the clicked location
        if (this.map) this.onMarkerAdd(this.map, lat, lng);

      });
    }

    this.map.setView([this.address().lat, this.address().lng ], 13);
  }

  onMarkerAdd(map: L.Map | any, lat: number, lng: number) {
  
    // Manually set the path for the marker icon
    const markerIcon = L.icon({
      iconUrl: 'assets/marker-icon.png', // Adjust path if needed
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/marker-shadow.png', // Optional, for shadow
      shadowSize: [41, 41]
    });
  
    this.marker = L.marker([ lat, lng ], { icon: markerIcon }).addTo(map);
  }
}
