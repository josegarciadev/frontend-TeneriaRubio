import { Component, OnInit } from '@angular/core';
import {LineaService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-linea',
  templateUrl: './linea.component.html',
  styles: []
})
export class LineaComponent implements OnInit {
 public query :any =[];
 
  constructor(private lineaService:LineaService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.lineaService.getLinea()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteDep(id:number | string){
    this.lineaService.deleteLinea(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
