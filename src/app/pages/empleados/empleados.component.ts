import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../services/services.index';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styles: []
})
export class EmpleadosComponent implements OnInit {
  public query :any =[];

  constructor(private empleadosServices: EmpleadosService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.empleadosServices.getEmp().subscribe(
      res =>{
        this.query =res;
      },
      err=> console.error(err)
    )
  }

  deleteEmp(id:number | string){
    this.empleadosServices.deleteEmp(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }
}
