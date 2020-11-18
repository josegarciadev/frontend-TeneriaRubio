import { Component, OnInit } from '@angular/core';
import {SalidaempleadoService} from '../../services/services.index';
@Component({
  selector: 'app-salida-emp',
  templateUrl: './salida-emp.component.html',
  styles: []
})
export class SalidaEmpComponent implements OnInit {
  public query :any =[];

  constructor(private salidaempleadoService: SalidaempleadoService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.salidaempleadoService.getSalEmp().subscribe(
      res =>{
        this.query =res;
      },
      err=> console.error(err)
    )
  }

  deleteEmp(id:number | string){
    this.salidaempleadoService.deleteSalEmp(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
