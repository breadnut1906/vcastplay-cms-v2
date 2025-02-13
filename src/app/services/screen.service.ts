import { computed, effect, Injectable, signal } from '@angular/core';
import { Screen } from '../models/screen';

@Injectable({
    providedIn: 'root'
})
export class ScreenService {

    isDrawer = signal<boolean>(false);
    isEditMode = signal<boolean>(false);
    isViewMode = signal<boolean>(false);

    screens = signal<Screen[]>([]);
    screeFilters = signal<any>({});

    selectedScreen = signal<Screen | null>(null);

    resolutions = computed(() => [ ...new Set(this.screens().map(s => s.orientation.resolution)) ]);
    locations = computed(() => [ ...new Set(this.screens().map(s => s.geographic.location)) ]);
    landmarks = computed(() => [ ...new Set(this.screens().map(s => s.geographic.landmark)) ]);
    groups = computed(() => [ ...new Set(this.screens().map(s => s.group)) ]);
    subSubGroups = computed(() => [ ...new Set(this.screens().map(s => s.subGroup)) ]);
    types = computed(() => [ ...new Set(this.screens().map(s => s.type)) ]);
    statuses = computed(() => [ ...new Set(this.screens().map(s => s.status)) ]);
    
    constructor() {  }

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
                    orientation: "Landscape",
                    resolution: {
                        width: 1920,
                        height: 1080,
                    },
                },
                schedule: {
                    type: "Always On",
                    hours: { start: '00:00', end: '23:00' },
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
                    orientation: "Portrait",
                    resolution: {
                        width: 1080,
                        height: 1920,
                    },
                },
                schedule: {
                    type: "Week Days",
                    hours: { start: '09:00', end: '17:00' },
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
                    orientation: "Landscape",
                    resolution: {
                        width: 2560,
                        height: 1440,
                    },
                },
                schedule: {
                    type: "Always On",
                    hours: { start: '00:00', end: '23:00' },
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
                    orientation: "Portrait",
                    resolution: {
                        width: 1440,
                        height: 2560,
                    },
                },
                schedule: {
                    type: "Week Days",
                    hours: { start: '12:00', end: '20:00' },
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
                    orientation: "Landscape",
                    resolution: {
                        width: 3840,
                        height: 2160,
                    },
                },
                schedule: {
                    type: "Always On",
                    hours: { start: '00:00', end: '23:00' },
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
            {
                id: 6,
                code: "SCR006",
                name: "Union Square Display",
                type: "Windows",
                address: {
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    zipCode: "94102",
                    lat: 37.7881,
                    lng: -122.4075
                },
                group: "GroupF",
                subGroup: "SubGroup1",
                orientation: {
                    orientation: "Portrait",
                    resolution: {
                        width: 1080,
                        height: 1920
                    }
                },
                schedule: {
                    type: "Business Hours",
                    hours: { start: "08:00", end: "18:00" }
                },
                geographic: {
                    location: "Regional",
                    landmark: "Union Square"
                },
                caltonSerial: "CS123456",
                others: {
                    serial: "SER006",
                    ip: "192.168.1.6",
                    cpu: "Intel Core i5",
                    memory: "16GB",
                    storage: "512GB SSD",
                    operatingSystem: "Windows 10",
                    network: "Wi-Fi",
                    temperature: "22°C",
                    browser: "Chrome",
                    displayStatus: "Active"
                },
                status: "Active",
                lastUpdate: "2025-01-22T10:00:00Z"
            },
            {
                id: 7,
                code: "SCR007",
                name: "Coffee Shop Display",
                type: "Windows",
                address: {
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    zipCode: "94103",
                    lat: 37.7742,
                    lng: -122.4108
                },
                group: "GroupG",
                subGroup: "SubGroup2",
                orientation: {
                    orientation: "Portrait",
                    resolution: {
                        width: 720,
                        height: 1280
                    }
                },
                schedule: {
                    type: "Limited Hours",
                    hours: { start: "09:00", end: "17:00" }
                },
                geographic: {
                    location: "Local",
                    landmark: "Coffee Hub"
                },
                caltonSerial: "CS654321",
                others: {
                    serial: "SER007",
                    ip: "192.168.1.7",
                    cpu: "Intel Celeron",
                    memory: "4GB",
                    storage: "128GB SSD",
                    operatingSystem: "Windows 10 IoT",
                    network: "Wi-Fi",
                    temperature: "24°C",
                    browser: "Edge",
                    displayStatus: "Active"
                },
                status: "Active",
                lastUpdate: "2025-01-25T11:00:00Z"
            },
            {
                id: 8,
                code: "SCR008",
                name: "Mini Kiosk Display",
                type: "Windows",
                address: {
                    city: "San Francisco",
                    state: "CA",
                    country: "USA",
                    zipCode: "94104",
                    lat: 37.7929,
                    lng: -122.4017
                },
                group: "GroupH",
                subGroup: "SubGroup3",
                orientation: {
                    orientation: "Landscape",
                    resolution: {
                        width: 1280,
                        height: 720
                    }
                },
                schedule: {
                    type: "Custom",
                    hours: { start: "10:00", end: "20:00" }
                },
                geographic: {
                    location: "Local",
                    landmark: "Downtown Mall"
                },
                caltonSerial: "CS111222",
                others: {
                    serial: "SER008",
                    ip: "192.168.1.8",
                    cpu: "Intel Atom",
                    memory: "2GB",
                    storage: "64GB eMMC",
                    operatingSystem: "Windows 10 IoT",
                    network: "Wi-Fi",
                    temperature: "23°C",
                    browser: "Firefox",
                    displayStatus: "Active"
                },
                status: "Active",
                lastUpdate: "2025-01-28T15:00:00Z"
            },            
        ])
    }

    onEditScreen(screen: Screen) { 
        this.isEditMode.set(true);
        this.selectedScreen.set(screen);
        this.isDrawer.set(true);
        this.isViewMode.set(false);
    }

    onSaveScreen(screen: Screen) {
        console.log('Save this: ', screen);
        
        this.selectedScreen.set(null);
        this.isDrawer.set(false);
        this.isEditMode.set(false);
        this.isViewMode.set(false);
    }

    onNewScreen() {
        this.isEditMode.set(false);
        this.selectedScreen.set(null);
        this.isDrawer.set(true);
    }

    onViewScreen(screen: Screen) {
        this.selectedScreen.set(screen);

        this.isEditMode.set(true);
        this.isViewMode.set(true);
        this.isDrawer.set(true);
    }
}
