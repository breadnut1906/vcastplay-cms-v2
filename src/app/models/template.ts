import { Assets } from "./asset-library";

export interface Template {
    name: string;
    description: string;
    category: string;
    canvas: Resolutions,
    orientation: string; // (e.g., portrait, landscape)
    layers: Array<Content>,
    zoomScale: number;
    createdOn: string; // ISO 8601 date format
    lastUpdate: string; // ISO 8601 date format
}

export interface Content {
    top: number;
    left: number;
    width: number;
    height: number;
    css?: string;
    assets?: Array<Assets>;
}

export interface Resolutions {
    name: string;
    width: number;
    height: number;
}
