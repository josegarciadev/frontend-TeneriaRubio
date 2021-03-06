import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {NgxPaginationModule} from 'ngx-pagination'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// rutas
import { APP_ROUTES } from './app.routes';

 // Modulos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';

// Guards
import {AutenticarGuard} from './guards/autenticar.guard';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    ServiceModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [
    AutenticarGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
