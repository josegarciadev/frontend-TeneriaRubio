import { Component, OnInit } from '@angular/core';
import {AuditoriasAlmacenService} from '../../../services/services.index';
@Component({
  selector: 'app-entSal',
  templateUrl: './entSal.component.html',
  styles: []
})
export class EntSalComponent implements OnInit {
  public  p: number = 1;
 
  public entradaSalida:any=[];
  
  constructor(private auditoriasAlmacenServices:AuditoriasAlmacenService) { }

  ngOnInit() {
    this.getEntsal();
  }

  getEntsal(){
    this.auditoriasAlmacenServices.getEntsal().subscribe(
      res=>{
        this.entradaSalida=res;
      },
      err=>console.error(err)
    )
  }


}
