import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SidebarService } from './shared/sidebar.service';
import {DepartamentosService} from './pages/departamentos.service';
import {EmpleadosService} from './pages/empleados.service';
import {EntradaempleadosService} from './pages/entradaempleados.service';
import {EntradalineaService} from './pages/entradalinea.service';
import {UsuarioService} from './pages/usuario.service';
import {LineaService} from './pages/linea.service';
import {LineaProdService} from './pages/lineaprod.service';
import {ProductoService} from './pages/producto.service';
import {ProveedorService} from './pages/proveedor.service';
import {SalidalineaService} from './pages/salidalinea.service';
import {SalidaempleadoService} from './pages/salidaempleado.service';
import {ProdproveeService} from './pages/prodprovee.service';
import {AuditoriasAlmacenService} from './pages/auditoriasAlmacen.service';
import {AuditoriasRecursosHService} from './pages/auditoriasRecursosh.service';

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
    EntradaempleadosService,
    EmpleadosService,
    EntradalineaService,
    UsuarioService,
    LineaService,
    LineaProdService,
    ProveedorService,
    ProductoService,
    SalidalineaService,
    SalidaempleadoService,
    ProdproveeService,
    AuditoriasAlmacenService,
    AuditoriasRecursosHService
  ]
})
export class ServiceModule { }
