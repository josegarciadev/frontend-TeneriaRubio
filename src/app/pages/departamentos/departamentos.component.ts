import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: []
})
export class DepartamentosComponent implements OnInit {
  public query :any =[];

  constructor(private departamentosServices: DepartamentosService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.departamentosServices.getDep()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteDep(id:number | string){
    this.departamentosServices.deleteDep(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }
}


