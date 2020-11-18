import { Component, OnInit } from '@angular/core';
import {EntradaempleadosService} from '../../services/services.index';
@Component({
  selector: 'app-entrada-emp',
  templateUrl: './entrada-emp.component.html',
  styles: []
})
export class EntradaEmpComponent implements OnInit {
  public query :any =[];

  constructor(private entradaempleadosService: EntradaempleadosService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.entradaempleadosService.getEntEmp().subscribe(
      res =>{
        this.query =res;
      },
      err=> console.error(err)
    )
  }

  deleteEmp(id:number | string){
    this.entradaempleadosService.deleteEntEmp(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
