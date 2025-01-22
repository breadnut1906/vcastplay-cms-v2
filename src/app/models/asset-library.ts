export interface Assets {
    id: number;
    code: string;
    name: string;
    type: string; // (e.g., Audio, Documents, Images, Web Pages, Widgets, Videos, Canva (Premium))
    file: any; // blob type, web link, or base64 string 
    category: string;
    subCategory: string;
    fileDetails: FileDetails; // orientation, size, etc. (auto detect)
    audience: Audience;
    availability: string;
    lastUpdate: string; // ISO 8601 date format
}

interface FileDetails {
    orientation: string;
    resolution: string;
    fileSize: string
}


export interface Audience {
    id: number;
    name: string;
    demographic: {
        ageGroup: string; // (e.g., children, teenagers, adults, seniors),
        gender: string;
    };
    temporal: {
        duration: string; //time of day (e.g., Morning, Afternoon, Evening, Late Night),
        frequency: string; //seasonality (e.g., Summer, Winter, Holiday Periods)
    };
    geographic: {
        location: string; // (e.g., local, regional, national)
        landmark: string; // point of interest (e.g., city center, park, beach)
    };
}   