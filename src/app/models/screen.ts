export interface Screen {
    id: number;
    code: string;
    name: string;
    type: string;
    address: ScreenAddress;
    group: string;
    subGroup: string;
    orientation: ScreenOrientation;
    schedule: ScreenSchedule;
    geographic: ScreenGeoLocation;
    caltonSerial: string;
    others: ScreenDeviceDetails,
    status: string;
    lastUpdate: string;
}

export interface ScreenAddress {
    city: string;
    state: string;
    country: string;
    zipCode: string;
    lat: number;
    lng: number;
}
export interface ScreenOrientation {
    orientation: string; // Landscape or Portrait
    resolution: {
        width: number;
        height: number;
    };
}

interface ScreenSchedule {
    type: string;
    hours: { start: string; end: string; };
}


interface ScreenGeoLocation {
    location: string;
    landmark: string;
}

interface ScreenDeviceDetails {
    serial: string;
    ip: string;
    cpu: string;
    memory: string;
    storage: string;
    operatingSystem: string;
    network: string;
    temperature: string;
    browser: string;
    displayStatus: string;
}
