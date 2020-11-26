import { Component, OnInit } from '@angular/core';
import {AuditoriasAlmacenService} from '../../../services/services.index';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: []
})
export class UpdateComponent implements OnInit {

  public x: number=1;
 
  public entradaSalidaup:any=[];
 
  constructor(private auditoriasAlmacenServices:AuditoriasAlmacenService) { }

  ngOnInit() {
    
    this.getEntSalUp();
   
  }


  getEntSalUp(){
    this.auditoriasAlmacenServices.getEntSalUp().subscribe(
      res=>{
        this.entradaSalidaup=res;
      },
      err=>console.error(err)
    )
  }

}
