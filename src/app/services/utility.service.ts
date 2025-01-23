import { Injectable, signal } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  isMobileSignal = signal(false);

  constructor(
    private breakPointObserver: BreakpointObserver, 
  ) { 
    this.breakPointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        const isMobile = Object.keys(result.breakpoints).some(
          (query) => result.breakpoints[query]
        );
        this.isMobileSignal.set(isMobile);
      });
  }

  async onGetUserLocation() {
    return await new Promise((resolve: any, reject: any) => navigator.geolocation.getCurrentPosition(resolve, reject))    
  }

  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) +'' + sizes[i];
  }
}
