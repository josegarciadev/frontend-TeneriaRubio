import { Component, OnInit } from '@angular/core';
import {AuditoriasAlmacenService} from '../../../services/services.index';
@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styles: []
})
export class AlmacenComponent implements OnInit {
  public  p: number = 1;
  public x: number=1;
  public y: number=1;
  public entradaSalida:any=[];
  public entradaSalidaup:any=[];
  public usuarios:any=[];
  constructor(private auditoriasAlmacenServices:AuditoriasAlmacenService) { }

  ngOnInit() {
    this.getEntsal();
    this.getEntSalUp();
    this.getUser();
  }

  getEntsal(){
    this.auditoriasAlmacenServices.getEntsal().subscribe(
      res=>{
        this.entradaSalida=res;
      },
      err=>console.error(err)
    )
  }

  getEntSalUp(){
    this.auditoriasAlmacenServices.getEntSalUp().subscribe(
      res=>{
        this.entradaSalidaup=res;
      },
      err=>console.error(err)
    )
  }
  getUser(){
    this.auditoriasAlmacenServices.getUser().subscribe(
      res=>{
        this.usuarios=res;
      },
      err=>console.error(err)
    )
  }

}
