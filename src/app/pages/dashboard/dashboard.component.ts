import { Component, OnInit } from '@angular/core';
import { UsuarioService,EmpleadosService,ProductoService,ProveedorService, } from '../../services/services.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  public sesion= JSON.parse(sessionStorage.getItem('user'));
  public usuarios:number;
  public empleados:number;
  public productos:number;
  public proveedor:number;
  constructor(private _userSvc:UsuarioService,private _empSvc:EmpleadosService,private _prodSvc:ProductoService, private _proveSvc:ProveedorService) { }

  ngOnInit() {
    this._userSvc.usuario=this.sesion;
    this.getUsuarios();
    this.getEmpleados();
    this.getProducto();
    this.getProveedor();
  }

  getUsuarios(){
    this._userSvc.getUsuarios().subscribe(
      res=>{
        let data:any= res;
        this.usuarios= data.valor;
       
      },
      err=> console.error(err)
    );
  }
  getEmpleados(){
    this._empSvc.getEmpleado().subscribe(
      res=>{
        let data:any= res;
        this.empleados= data.valor;
        
      },
      err=> console.error(err)
    );
  }
  getProducto(){
    this._prodSvc.getProductos().subscribe(
      res=>{
        let data:any= res;
        this.productos= data.valor;
        
      },
      err=> console.error(err)
    );
  }

  getProveedor(){
    this._proveSvc.getProveedores().subscribe(
      res=>{
        let data:any= res;
        this.proveedor= data.valor;
    
      },
      err=> console.error(err)
    );
  }

}
