import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Dashboard'
    }
];
