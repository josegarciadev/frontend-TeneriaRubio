import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  public query :any =[];
  constructor(private productoServices: ProductoService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.productoServices.getProd()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteProd(id:number | string){
    this.productoServices.deleteProd(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }

}
