import { Component, OnInit } from '@angular/core';
import {AuditoriasRecursosHService} from '../../../services/services.index';
@Component({
  selector: 'app-recursosh',
  templateUrl: './recursosh.component.html',
  styles: []
})
export class RecursoshComponent implements OnInit {
  public  p: number = 1;
  public x: number=1;
  public y: number=1;
  public entradas:any=[];
  public salidas:any=[];
  public empleados:any=[];
  constructor(private auditoriasRecursosHService:AuditoriasRecursosHService) { }

  ngOnInit() {
    this.getEntrada();
    this.getSalida();
    this.getUser();
  }

  getEntrada(){
    this.auditoriasRecursosHService.getEntrada().subscribe(
      res=>{
        this.entradas=res;
      },
      err=>console.error(err)
    )
  }

  getSalida(){
    this.auditoriasRecursosHService.getSalida().subscribe(
      res=>{
        this.salidas=res;
      },
      err=>console.error(err)
    )
  }
  getUser(){
    this.auditoriasRecursosHService.getEmpleado().subscribe(
      res=>{
        this.empleados=res;
      },
      err=>console.error(err)
    )
  }

}
