import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import {DepartamentosService} from './pages/departamentos.service';
import {EmpleadosService} from './pages/empleados.service';
import {EntradalineaService} from './pages/entradalinea.service';
import {UsuarioService} from './pages/usuario.service';
import {LineaService} from './pages/linea.service';
import {LineaProdService} from './pages/lineaprod.service';
import {ProductoService} from './pages/producto.service';
import {ProveedorService} from './pages/proveedor.service';
import {ProdproveeService} from './pages/prodprovee.service';


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
    DepartamentosService,
    EmpleadosService,
    EntradalineaService,
    UsuarioService,
    LineaService,
    LineaProdService,
    ProveedorService,
    ProductoService,
    ProdproveeService
  ]
})
export class ServiceModule { }
