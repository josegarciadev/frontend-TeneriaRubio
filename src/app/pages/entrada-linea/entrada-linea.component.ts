import { Component, OnInit } from '@angular/core';
import {EntradalineaService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-entrada-linea',
  templateUrl: './entrada-linea.component.html',
  styles: []
})
export class EntradaLineaComponent implements OnInit {
  public query :any =[];
  constructor(private entradalineaService:EntradalineaService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.entradalineaService.getEntLinea()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteEntLinea(id:number | string){
    this.entradalineaService.deleteEntLinea(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }
}
