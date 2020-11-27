import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../services/services.index';
import {Producto} from '../../../Models/producto';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-producto',
  templateUrl: './agg-producto.component.html',
  styles: []
})
export class AggProductoComponent implements OnInit {
  public formProd: FormGroup;
  public producto:Producto={
    id_producto: 0,
    codigo_producto:'',
    nombre_producto:'',
    unidad_medida:''
  }
  public estado: boolean=false;
  public params;
  constructor(private productoServices: ProductoService, private router:Router,
    private activatedRouter: ActivatedRoute,private _fb:FormBuilder) { }

    ngOnInit() {
      this.formProd = this._fb.group({
        codigo_producto:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
        nombre_producto: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
        unidad_medida:['',[Validators.required]],
      });
      this.params=this.activatedRouter.snapshot.params.id;
      if(this.params){
        this.getOne(this.params);
        this.estado=true;
      }
      
    }
    get codigo_producto(){return this.formProd.get('codigo_producto');}
    get nombre_producto(){return this.formProd.get('nombre_producto');}
    get unidad_medida(){return this.formProd.get('unidad_medida');}
    submit(){
      if(this.formProd.valid){
        if(this.estado===true){
          this.updateDep(this.formProd.value);
        }else{
          this.saveDep(this.formProd.value);
        }
      }
  
    }
    cancelar(){
      this.router.navigate(['/productos']);
    }
  
    saveDep(producto){
     
      this.productoServices.createProd(producto)
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
            this.formProd.patchValue(res);
  
          },
          err=>console.error(err)
        );
    }
  
    updateDep(producto){
      this.productoServices.updateProd(this.params,producto)
        .subscribe(
          res =>{
            this.router.navigate(['/productos']);
          },
          err=> console.error(err)
        );
    }
  

}
