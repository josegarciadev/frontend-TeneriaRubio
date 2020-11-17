import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../services/services.index';
import {Producto} from '../../../Models/producto';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-producto',
  templateUrl: './agg-producto.component.html',
  styles: []
})
export class AggProductoComponent implements OnInit {
  public producto:Producto={
    id_producto: 0,
    codigo_producto:'',
    nombre_producto:'',
    unidad_medida:''
  }
  public estado: boolean=false;
  constructor(private productoServices: ProductoService, private router:Router,
    private activatedRouter: ActivatedRoute) { }

    ngOnInit() {
      const params=this.activatedRouter.snapshot.params.id;
      if(params){
        this.getOne(params);
        this.estado=true;
      }
      
    }
  
    saveDep(){
      delete this.producto.id_producto;
  
      this.productoServices.createProd(this.producto)
      .subscribe(
        res=>{
          this.router.navigate(['/productos']);
        },
        err=> console.error(err)
      );
      
    }
  
    getOne(id:number | string){
      this.productoServices.getOneProd(id)
        .subscribe(
          res=>{
            this.producto=res;
  
          },
          err=>console.error(err)
        );
    }
  
    updateDep(){
      this.productoServices.updateProd(this.producto.id_producto, this.producto)
        .subscribe(
          res =>{
            this.router.navigate(['/productos']);
          },
          err=> console.error(err)
        );
    }
  

}
