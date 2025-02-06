import { Assets } from "./asset-library";
import { ScreenOrientation } from "./screen";

export interface Template {
    name: string;
    description: string;
    category: string;
    orientation: ScreenOrientation;
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
