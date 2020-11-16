import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard', content: 'Pagina principal'} },
            { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress', content: 'Pagina donde Existen dos Progress'} },
            { path: 'graficas1', component: Graficas1Component, data:{titulo: 'Graficas', content: 'Graficas de diferente tipos'} },
            { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas', content: 'Practica Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RxJs', content: 'Observables'} },
            // tslint:disable-next-line: max-line-length
            { path: 'account-settings', component: AccoutSettingsComponent, data:{titulo: 'Ajustes del Usuario', content: 'ajustes del menu'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
