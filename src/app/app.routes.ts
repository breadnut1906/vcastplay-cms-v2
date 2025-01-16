import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent),
                title: 'VCASTPLAY 2.0 · Dashboard',
            }
        ]
    }
];
