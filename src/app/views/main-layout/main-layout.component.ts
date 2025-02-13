import { Component, inject, signal, viewChild } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { Sidenav } from '../../models/sidenav';
import { UtilityService } from '../../services/utility.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [ MaterialUiModule, RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  utility = inject(UtilityService);
  isMinimized = signal<boolean>(true);
  drawer = viewChild.required<MatSidenav>('drawer');

  menuItems = signal<Sidenav[]>([
    {
      text: 'Dashboard',
      icon: 'dashboard',
      route: '/home',
    },
    {
      text: 'Screen Registration',
      icon: 'monitor',
      route: '/screen-registration',
    },
    {
      text: 'Asset Library',
      icon: 'photo_library',
      route: '/asset-library',
    },
    {
      text: 'Design Editor',
      icon: 'imagesearch_roller',
      route: '/design-editor',
    },
    {
      text: 'Playlist',
      icon: 'playlist_play',
      route: '/playlists',
    },
    {
      text: 'Schedules',
      icon: 'schedule',
      route: '/schedule',
    },
    {
      text: 'Screen Management',
      icon: 'video_settings',
      route: '/screen-management',
    },
    {
      text: 'Reports',
      icon: 'description',
      route: '/reports',
    },
  ])

  onClickToggleSideNav() {
    if (this.utility.isMobileSignal()) {
      this.drawer().toggle();
    } else {
      this.isMinimized.set(!this.isMinimized());
    }
  }

  onClickToggleDrawerNav() {
    if (this.utility.isMobileSignal()) this.drawer().toggle();
  }
}
