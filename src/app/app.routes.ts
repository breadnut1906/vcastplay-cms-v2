import { Routes } from '@angular/router';

const projectTitle: string = 'VCASTPLAY 2.0';
export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./views/authentication/login/login.component').then(m => m.LoginComponent),
        title: `${projectTitle} · Login`,
    },
    {
        path: '',
        loadComponent: () => import('./views/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: `${projectTitle} · Dashboard`,
            },
            {
                path: 'screen-registration',
                loadComponent: () => import('./views/screen-registration/screen-registration.component').then(m => m.ScreenRegistrationComponent),
                title: `${projectTitle} · Screen Registration`,
            },
            {
                path: 'asset-library',
                loadComponent: () => import('./views/asset-library/asset-library.component').then(m => m.AssetLibraryComponent),
                title: `${projectTitle} · Asset Library`,
            },
            {
                path: 'playlists',
                loadComponent: () => import('./views/playlists/playlists.component').then(m => m.PlaylistsComponent),
                title: `${projectTitle} · Playlists`,
            },
            {
                path: 'accounts',
                loadComponent: () => import('./views/accounts/account-settings/account-settings.component').then(m => m.AccountSettingsComponent),
                title: `${projectTitle} · Account Settings`,
            },
            {
                path: 'my-profile',
                loadComponent: () => import('./views/accounts/my-profile/my-profile.component').then(m => m.MyProfileComponent),
                title: `${projectTitle} · My Profile`
            },
            {
                path: '**',
                loadComponent: () => import('./views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
                title: `${projectTitle} · Page Not Found`,
            },
        ]
    },
];
