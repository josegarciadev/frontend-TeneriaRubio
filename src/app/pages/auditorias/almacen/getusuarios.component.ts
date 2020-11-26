import { Component, OnInit } from '@angular/core';
import {AuditoriasAlmacenService} from '../../../services/services.index';
@Component({
  selector: 'app-getusuarios',
  templateUrl: './getusuarios.component.html',
  styles: []
})
export class GetUsuariosComponent implements OnInit {
 
  public y: number=1;
  public page: number=1; 
  public usuarios:any=[];
  public sesiones:any=[];
  constructor(private auditoriasAlmacenServices:AuditoriasAlmacenService) { }

  ngOnInit() {
    
    this.getUser();
    this.getSesiones();
  }


  
  getUser(){
    this.auditoriasAlmacenServices.getUser().subscribe(
      res=>{
        this.usuarios=res;
      },
      err=>console.error(err)
    )
  }

  getSesiones(){
    this.auditoriasAlmacenServices.getSesiones().subscribe(
      res=>{
        this.sesiones=res;
        console.log(res);
      },
      err=>console.error(err)
    );
  }

}
