
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import {AutenticarGuard} from './guards/autenticar.guard';

const appRoutes: Routes =   [
    {path: 'login', component: LoginComponent,data:{titulo: 'Login', content: 'LOGIN'}},
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true }) ;
