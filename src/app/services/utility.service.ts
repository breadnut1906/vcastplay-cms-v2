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
}
