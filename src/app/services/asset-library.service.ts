import { Injectable, signal } from '@angular/core';
import { Assets } from '../models/asset-library';

@Injectable()
export class AssetLibraryService {

  isDrawer = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  isViewMode = signal<boolean>(false);

  assets = signal<Assets[]>([]);
  screeFilters = signal<any>({});

  selectedAsset = signal<Assets | null>(null);

  constructor() { }

  onFetchAssets() { 
    this.assets.set([
      {
        id: 1,
        code: "AUDIO001",
        name: "Relaxing Nature Sounds",
        type: "Audio",
        file: "https://example.com/assets/audio/nature-sounds.mp3",
        category: "Wellness",
        subCategory: "Meditation",
        fileDetails: {
          orientation: "Stereo",
          resolution: "128kbps",
          fileSize: "15MB",
        },
        audience: {
          id: 101,
          name: "Nature Enthusiasts",
          demographic: {
            ageGroup: "adults",
            gender: "all",
          },
          temporal: {
            duration: "Evening",
            frequency: "Holiday Periods",
          },
          geographic: {
            location: "regional",
            landmark: "parks",
          },
        },
        availability: "Available",
        lastUpdate: "2025-01-15T08:00:00Z",
      },
      {
        id: 2,
        code: "DOC002",
        name: "Employee Handbook 2025",
        type: "Documents",
        file: "https://example.com/assets/documents/handbook2025.pdf",
        category: "Corporate",
        subCategory: "HR Resources",
        fileDetails: {
          orientation: "Portrait",
          resolution: "PDF",
          fileSize: "2MB",
        },
        audience: {
          id: 102,
          name: "Company Staff",
          demographic: {
            ageGroup: "adults",
            gender: "all",
          },
          temporal: {
            duration: "Morning",
            frequency: "Year-round",
          },
          geographic: {
            location: "national",
            landmark: "head office",
          },
        },
        availability: "Restricted",
        lastUpdate: "2025-01-10T12:00:00Z",
      },
      {
        id: 3,
        code: "IMG003",
        name: "Beach Sunset Wallpaper",
        type: "Images",
        file: "https://example.com/assets/images/beach-sunset.jpg",
        category: "Photography",
        subCategory: "Landscapes",
        fileDetails: {
          orientation: "Landscape",
          resolution: "1920x1080",
          fileSize: "2MB",
        },
        audience: {
          id: 103,
          name: "Travel Enthusiasts",
          demographic: {
            ageGroup: "teenagers",
            gender: "all",
          },
          temporal: {
            duration: "Afternoon",
            frequency: "Summer",
          },
          geographic: {
            location: "local",
            landmark: "beach",
          },
        },
        availability: "Available",
        lastUpdate: "2025-01-05T16:00:00Z",
      },
      {
        id: 4,
        code: "VID004",
        name: "Fitness Routine for Seniors",
        type: "Videos",
        file: "https://example.com/assets/videos/fitness-seniors.mp4",
        category: "Health",
        subCategory: "Exercise",
        fileDetails: {
          orientation: "Landscape",
          resolution: "1080p",
          fileSize: "500MB",
        },
        audience: {
          id: 104,
          name: "Elderly Fitness Seekers",
          demographic: {
            ageGroup: "seniors",
            gender: "all",
          },
          temporal: {
            duration: "Morning",
            frequency: "Winter",
          },
          geographic: {
            location: "regional",
            landmark: "community centers",
          },
        },
        availability: "Available",
        lastUpdate: "2025-01-20T09:30:00Z",
      },
      {
        id: 5,
        code: "WIDGET005",
        name: "Weather Update Widget",
        type: "Widgets",
        file: "https://example.com/assets/widgets/weather-widget.html",
        category: "Technology",
        subCategory: "Utilities",
        fileDetails: {
          orientation: "Responsive",
          resolution: "HTML",
          fileSize: "50KB",
        },
        audience: {
          id: 105,
          name: "General Users",
          demographic: {
            ageGroup: "all ages",
            gender: "all",
          },
          temporal: {
            duration: "All day",
            frequency: "Year-round",
          },
          geographic: {
            location: "national",
            landmark: "online",
          },
        },
        availability: "Available",
        lastUpdate: "2025-01-18T11:00:00Z",
      },
    ]);    
  }

  onEditAssets(asset: Assets) {
    this.selectedAsset.set(asset);
    this.isEditMode.set(true);
    this.isDrawer.set(true);
    this.isViewMode.set(false);
  }

  onViewAssets(asset: Assets) { 
    this.selectedAsset.set(asset);
    this.isViewMode.set(true);
    this.isDrawer.set(true);
    this.isEditMode.set(false);
  }

  onDownloadAssets(asset: Assets) { }

  onUploadAssets() { 
    this.isEditMode.set(false);
    this.selectedAsset.set(null);
    this.isDrawer.set(true);
  }

  onSaveAssets() { 
    console.log('Upload this to server: ', this.selectedAsset());
    
    this.isDrawer.set(false);
    this.selectedAsset.set(null);
    this.isEditMode.set(false);
    this.isViewMode.set(false);
  }

  onRemoveAssets(asset: Assets) { }
}
