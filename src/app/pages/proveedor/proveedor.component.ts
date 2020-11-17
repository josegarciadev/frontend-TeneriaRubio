import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../services/services.index';
import {Router} from '@angular/router';
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {
  public query :any =[];
  constructor(private proveedorServices: ProveedorService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }
  getList(){
    this.proveedorServices.getProv()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  deleteProv(id:number | string){
    this.proveedorServices.deleteProv(id)
          .subscribe(
            res=>{
              console.log(res);
              this.getList();
            },
            err=>console.error(err)
          );
  }
}
