import { Component, signal } from '@angular/core';
import { MaterialUiModule } from '../../modules/material-ui/material-ui.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Sidenav } from '../../models/sidenav';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [ MaterialUiModule, RouterOutlet, RouterModule, FooterComponent ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  isMinimized = signal(true);

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
      text: 'Playlist',
      icon: 'playlist_play',
      route: '/playlist',
    },
    {
      text: 'Design Layout',
      icon: 'imagesearch_roller',
      route: '/design-layout',
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
}
