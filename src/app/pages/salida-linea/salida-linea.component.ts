import { Component, OnInit } from '@angular/core';
import {SalidalineaService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-salida-linea',
  templateUrl: './salida-linea.component.html',
  styles: []
})
export class SalidaLineaComponent implements OnInit {
  public query :any =[];
  constructor(private salidalineaService:SalidalineaService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.salidalineaService.getSalLinea()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteSalLinea(id:number | string){
    this.salidalineaService.deleteSalLinea(id)
          .subscribe(
            res=>{
              
              this.getList();
            },
            err=>console.error(err)
          );
  }
}
