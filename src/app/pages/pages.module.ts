import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { DepartamentosComponent } from './departamentos/departamentos.component';
import { AggDepComponent } from './departamentos/agg-dep/agg-dep.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AggEmpComponent } from './empleados/agg-emp/agg-emp.component';
import { EntradaEmpComponent } from './entrada-emp/entrada-emp.component';
import { EntradaLineaComponent } from './entrada-linea/entrada-linea.component';
import { AggEntLineaComponent } from './entrada-linea/agg-ent-linea/agg-ent-linea.component';
import { LineaComponent } from './linea/linea.component';
import { AggLineaComponent } from './linea/agg-linea/agg-linea.component';
import { LineaProdComponent } from './linea-prod/linea-prod.component';
import { AggLineaProdComponent } from './linea-prod/agg-linea-prod/agg-linea-prod.component';
import { ProductoComponent } from './producto/producto.component';
import { AggProductoComponent } from './producto/agg-producto/agg-producto.component';
import { ProdprovComponent } from './prodprov/prodprov.component';
import { AggProdprovComponent } from './prodprov/agg-prodprov/agg-prodprov.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { AggProveedorComponent } from './proveedor/agg-proveedor/agg-proveedor.component';
import { SalidaEmpComponent } from './salida-emp/salida-emp.component';
import { AggSalEmpComponent } from './salidaEmp/agg-sal-emp/agg-sal-emp.component';
import { SalidaLineaComponent } from './salida-linea/salida-linea.component';
import { AggSalLineaComponent } from './salidaLinea/agg-sal-linea/agg-sal-linea.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AggUsuarioComponent } from './usuario/agg-usuario/agg-usuario.component';
import { AggEntEmpComponent } from './entrada-emp/agg-ent-emp/agg-ent-emp.component';
import { RecursoshComponent } from './auditorias/recursosh/recursosh.component';
import { AlmacenComponent } from './auditorias/almacen/almacen.component';
import {EntSalComponent} from './auditorias/almacen/entSal.component';
import {UpdateComponent} from './auditorias/almacen/update.component';
import {GetUsuariosComponent} from './auditorias/almacen/getusuarios.component';
import {AutenticarGuard} from '../guards/autenticar.guard';
import {RootRolGuard} from '../guards/root-rol.guard';
import {AdminalRolGuard} from '../guards/adminal-rol.guard';
import {AdminrhRolGuard} from '../guards/adminrh-rol.guard';
@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        DepartamentosComponent,
        AggDepComponent,
        EmpleadosComponent,
        AggEmpComponent,
        EntradaEmpComponent,
        EntradaLineaComponent,
        AggEntLineaComponent,
        LineaComponent,
        AggLineaComponent,
        LineaProdComponent,
        AggLineaProdComponent,
        ProductoComponent,
        AggProductoComponent,
        ProdprovComponent,
        AggProdprovComponent,
        ProveedorComponent,
        AggProveedorComponent,
        SalidaEmpComponent,
        AggSalEmpComponent,
        SalidaLineaComponent,
        AggSalLineaComponent,
        UsuarioComponent,
        AggUsuarioComponent,
        AggEntEmpComponent,
        RecursoshComponent,
        AlmacenComponent,
        EntSalComponent,
        UpdateComponent,
        GetUsuariosComponent,
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ],
    providers:[
        AutenticarGuard,
        RootRolGuard,
        AdminalRolGuard,
        AdminrhRolGuard
    ]

})

export class PagesModule { }
