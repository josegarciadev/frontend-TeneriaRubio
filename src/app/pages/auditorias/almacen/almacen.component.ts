import { Component, OnInit } from '@angular/core';
import {AuditoriasAlmacenService} from '../../../services/services.index';
@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styles: []
})
export class AlmacenComponent implements OnInit {
  
  public page: number=1; 
  
  public sesiones:any=[];
  constructor(private auditoriasAlmacenServices:AuditoriasAlmacenService) { }

  ngOnInit() {
    this.getSesiones();
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
