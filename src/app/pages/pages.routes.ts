import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


// Rutas principales
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
import {AutenticarGuard} from '../guards/autenticar.guard';
import {RootRolGuard} from '../guards/root-rol.guard';
import {AdminalRolGuard} from '../guards/adminal-rol.guard';
import {AdminrhRolGuard} from '../guards/adminrh-rol.guard';
const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent, canActivateChild:[AutenticarGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data:{titulo: 'Dashboard', content: 'Pagina principal'} },
            { path: 'progress', component: ProgressComponent, data:{titulo: 'Progress', content: 'Pagina donde Existen dos Progress'} },
            { path: 'graficas1', component: Graficas1Component, data:{titulo: 'Graficas', content: 'Graficas de diferente tipos'} },
            { path: 'promesas', component: PromesasComponent, data:{titulo: 'Promesas', content: 'Practica Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo: 'RxJs', content: 'Observables'} },
            // tslint:disable-next-line: max-line-length
            // Rutas Principales
            {path: 'addDepartamentos', component: AggDepComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Dep', content: 'Departamentos'}},
            {path: 'editDepartamentos/:id', component: AggDepComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Dep', content: 'Departamentos'}},
            {path: 'departamentos', component: DepartamentosComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver Dep', content: 'Ver Departamentos'}},
            //Empleados
            {path: 'addEmpleados', component: AggEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Empleados', content: 'Empleados'}},
            {path: 'editEmpleados/:id', component: AggEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Empleados', content: 'Empleados'}},
            {path: 'empleados', component: EmpleadosComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Empleados', content: 'Ver Empleados'}},
            //Entradas
            {path: 'addEntEmpl', component: AggEntEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Form entEmp', content: 'Entrada Empleados'}},
            {path: 'editEntEmpleados/:id', component: AggEntEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Form entEmp', content: 'Entrada Empleados'}},
            {path: 'entradaEmpleado', component: EntradaEmpComponent, data:{titulo: 'Ver entEmp', content: 'Ver Entrada Empleados'}},
            {path: 'addEntLinea', component: AggEntLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form entLinea', content: 'Entrada Linea'}},
            {path: 'editEntLinea/:id', component: AggEntLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form entLinea', content: 'Entrada Linea'}},
            {path: 'entradaLinea', component: EntradaLineaComponent, data:{titulo: 'Ver entLinea', content: 'Ver Entrada Linea'}},
            //Salidas
            {path: 'addSalEmpl', component: AggSalEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Form SalEmp', content: 'Salida Empleados'}},
            {path: 'editSalEmpleados/:id', component: AggSalEmpComponent,canActivate:[AdminrhRolGuard], data:{titulo: 'Form SalEmp', content: 'Salida Empleados'}},
            {path: 'salidaEmpleado', component: SalidaEmpComponent, data:{titulo: 'Ver SalEmp', content: 'Ver Salida Empleados'}},
            {path: 'addSalLinea', component: AggSalLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form salLinea', content: 'Salida Linea'}},
            {path: 'editSalLinea/:id', component: AggSalLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form salLinea', content: 'Salida Linea'}},
            {path: 'salidaLinea', component: SalidaLineaComponent, data:{titulo: 'Ver salLinea', content: 'Ver Salida Linea'}},
            //Linea
            {path: 'addlinea', component: AggLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Linea', content: 'Linea'}},
            {path: 'editLinea/:id', component: AggLineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Linea', content: 'Linea'}},
            {path: 'linea', component: LineaComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver Linea', content: 'Ver Linea'}},
             // Linea Productos
             {path: 'addLineaProd', component: AggLineaProdComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form LineaProducto', content: 'LineaProducto'}},
             {path: 'editLineaProd/:id', component: AggLineaProdComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form LineaProducto', content: 'LineaProducto'}},
             {path: 'lineaProd', component: LineaProdComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver LineaProducto', content: 'Ver LineaProducto'}},
              //  Productos
              {path: 'addProd', component: AggProductoComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Producto', content: 'Producto'}},
              {path: 'editProducto/:id', component: AggProductoComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Producto', content: 'Producto'}},
              {path: 'productos', component: ProductoComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver Producto', content: 'Ver Producto'}},
              //  Productos Proveedor
              {path: 'addprodprovee', component: AggProdprovComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form ProductoProveedor', content: 'ProductoProveedor'}},
              {path: 'editProdprov/:id', component: AggProdprovComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form ProductoProveedor', content: 'ProductoProveedor'}},
              {path: 'prodprovee', component: ProdprovComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver ProductoProveedor', content: 'Ver ProductoProveedor'}},
              // Proveedor
              {path: 'addproveedor', component: AggProveedorComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Proveedor', content: 'Proveedor'}},
              {path: 'editProveedor/:id', component: AggProveedorComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Form Proveedor', content: 'Proveedor'}},
              {path: 'proveedor', component: ProveedorComponent,canActivate:[AdminalRolGuard], data:{titulo: 'Ver Proveedor', content: 'Ver Proveedor'}},
              // Usuarios
              {path: 'adduser', component: AggUsuarioComponent,canActivate:[RootRolGuard], data:{titulo: 'Form Usuarios', content: 'Usuarios'}},
              {path: 'editUsuarios/:id', component: AggUsuarioComponent,canActivate:[RootRolGuard], data:{titulo: 'Form Usuarios', content: 'Usuarios'}},
              {path: 'usuarios', component: UsuarioComponent,canActivate:[RootRolGuard], data:{titulo: 'Ver Usuarios', content: 'Ver Usuarios'}},
              // Auditorias
              {path: 'auditoriasrh', component: RecursoshComponent,canActivate:[RootRolGuard], data:{titulo: 'Ver Recursos Humanos', content: 'Recursos Humanos'}},
              {path: 'auditoriasalm', component: AlmacenComponent,canActivate:[RootRolGuard],data:{titulo: 'Ver Almacen', content: 'Ver Almacen'}},


            
            //
            { path: 'account-settings', component: AccoutSettingsComponent, data:{titulo: 'Ajustes del Usuario', content: 'ajustes del menu'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
