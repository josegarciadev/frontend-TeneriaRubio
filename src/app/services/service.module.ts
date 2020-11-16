import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import {DepartamentosService} from './pages/departamentos.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SharedService,
    SidebarService,
    DepartamentosService
  ]
})
export class ServiceModule { }
