import { Assets } from "./asset-library";

export interface Playlist {
    id: number;
    name: string;
    description: string;
    isManual: boolean;
    transition: {
        isBlackGap: boolean;
        type: string; // (e.g., fade, crossfade, slide),
        speed: number; // seconds
    },
    contents?: Array<PlaylistContent>;
    tag: string;
    duration: number; // seconds
    status: string; // (e.g., Active, Inactive)
    createdOn: string; // ISO 8601 date format
    lastUpdate: string; // ISO 8601 date format
}


export interface PlaylistContent {
    content: Assets; // asset id, design layout, web link, or embed code
    duration: number; // seconds
}