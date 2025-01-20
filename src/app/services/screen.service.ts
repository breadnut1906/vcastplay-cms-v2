import { Injectable, signal } from '@angular/core';
import { Screen } from '../models/screen';

@Injectable()
export class ScreenService {

  isDrawer = signal<boolean>(false);

  screens = signal<Screen[]>([]);

  selectedScreen = signal<Screen | null>(null);

  constructor() { }

  onFetchScreens() {
    this.screens.set([
      {
          id: 1,
          code: "SCR001",
          name: "Times Square Display",
          type: "WebApp",
          address: {
              city: "New York",
              state: "NY",
              country: "USA",
              zipCode: "10001",
              lat: 40.7128,
              lng: -74.0060,
          },
          group: "GroupA",
          subGroup: "SubGroup1",
          orientation: {
              orientation: "Horizontal",
              resolution: "1920x1080",
          },
          schedule: {
              type: "Always On",
              hours: "00:00-23:59",
          },
          geographic: {
              location: "Local",
              landmark: "Times Square",
          },
          caltonSerial: "CS123456",
          others: {
              serial: "SER001",
              ip: "192.168.1.1",
              cpu: "Intel i5",
              memory: "8GB",
              storage: "256GB SSD",
              operatingSystem: "Windows 10",
              network: "WiFi",
              temperature: "35°C",
              browser: "Chrome",
              displayStatus: "Active",
          },
          status: "Active",
          lastUpdate: "2025-01-20T10:00:00Z",
      },
      {
          id: 2,
          code: "SCR002",
          name: "Hollywood Walk Kiosk",
          type: "Windows",
          address: {
              city: "Los Angeles",
              state: "CA",
              country: "USA",
              zipCode: "90001",
              lat: 34.0522,
              lng: -118.2437,
          },
          group: "GroupB",
          subGroup: "SubGroup2",
          orientation: {
              orientation: "Vertical",
              resolution: "1080x1920",
          },
          schedule: {
              type: "Week Days",
              hours: "09:00-17:00",
          },
          geographic: {
              location: "Regional",
              landmark: "Hollywood Boulevard",
          },
          caltonSerial: "CS654321",
          others: {
              serial: "SER002",
              ip: "192.168.1.2",
              cpu: "Intel i7",
              memory: "16GB",
              storage: "512GB SSD",
              operatingSystem: "Windows 11",
              network: "Ethernet",
              temperature: "30°C",
              browser: "Firefox",
              displayStatus: "Active",
          },
          status: "Inactive",
          lastUpdate: "2025-01-19T14:30:00Z",
      },
      {
          id: 3,
          code: "SCR003",
          name: "Millennium Interactive Board",
          type: "Android",
          address: {
              city: "Chicago",
              state: "IL",
              country: "USA",
              zipCode: "60601",
              lat: 41.8781,
              lng: -87.6298,
          },
          group: "GroupC",
          subGroup: "SubGroup3",
          orientation: {
              orientation: "Horizontal",
              resolution: "2560x1440",
          },
          schedule: {
              type: "Always On",
              hours: "00:00-23:59",
          },
          geographic: {
              location: "National",
              landmark: "Millennium Park",
          },
          caltonSerial: "CS789123",
          others: {
              serial: "SER003",
              ip: "192.168.1.3",
              cpu: "Qualcomm Snapdragon 865",
              memory: "12GB",
              storage: "1TB",
              operatingSystem: "Android 12",
              network: "5G",
              temperature: "28°C",
              browser: "Chrome",
              displayStatus: "Idle",
          },
          status: "Active",
          lastUpdate: "2025-01-18T08:15:00Z",
      },
      {
          id: 4,
          code: "SCR004",
          name: "Discovery Green Screen",
          type: "WebApp",
          address: {
              city: "Houston",
              state: "TX",
              country: "USA",
              zipCode: "77001",
              lat: 29.7604,
              lng: -95.3698,
          },
          group: "GroupD",
          subGroup: "SubGroup4",
          orientation: {
              orientation: "Vertical",
              resolution: "1440x2560",
          },
          schedule: {
              type: "Week Days",
              hours: "12:00-20:00",
          },
          geographic: {
              location: "Local",
              landmark: "Discovery Green",
          },
          caltonSerial: "CS456789",
          others: {
              serial: "SER004",
              ip: "192.168.1.4",
              cpu: "AMD Ryzen 5",
              memory: "16GB",
              storage: "512GB SSD",
              operatingSystem: "Ubuntu",
              network: "WiFi",
              temperature: "33°C",
              browser: "Edge",
              displayStatus: "Inactive",
          },
          status: "Active",
          lastUpdate: "2025-01-19T17:45:00Z",
      },
      {
          id: 5,
          code: "SCR005",
          name: "Pier 39 Display",
          type: "Windows",
          address: {
              city: "San Francisco",
              state: "CA",
              country: "USA",
              zipCode: "94101",
              lat: 37.7749,
              lng: -122.4194,
          },
          group: "GroupE",
          subGroup: "SubGroup5",
          orientation: {
              orientation: "Horizontal",
              resolution: "3840x2160",
          },
          schedule: {
              type: "Always On",
              hours: "00:00-23:59",
          },
          geographic: {
              location: "National",
              landmark: "Pier 39",
          },
          caltonSerial: "CS987654",
          others: {
              serial: "SER005",
              ip: "192.168.1.5",
              cpu: "Intel Xeon",
              memory: "64GB",
              storage: "2TB HDD",
              operatingSystem: "Windows Server 2019",
              network: "Fiber",
              temperature: "25°C",
              browser: "Opera",
              displayStatus: "Active",
          },
          status: "Active",
          lastUpdate: "2025-01-20T09:00:00Z",
      },
    ])
  }

  onEditScreen(screen: Screen) { 
    this.selectedScreen.set(screen);
    this.isDrawer.set(true);
  }

  onSaveScreen() {
    this.selectedScreen.set(null);
    this.isDrawer.set(false);
  }
}
