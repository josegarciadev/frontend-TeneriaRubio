import { Component, OnInit } from '@angular/core';
import {LineaProdService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-linea-prod',
  templateUrl: './linea-prod.component.html',
  styles: []
})
export class LineaProdComponent implements OnInit {
  public query :any =[];
  constructor(private lineaProdService:LineaProdService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.lineaProdService.getLineaProd()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteLineaprod(id:number | string){
    this.lineaProdService.deleteLineaProd(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }
}
