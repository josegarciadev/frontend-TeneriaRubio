import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../../services/services.index';
import {Prodprov} from '../../../Models/prodprov';
import {Router,ActivatedRoute}  from '@angular/router';
import {ProductoService} from '../../../services/services.index';
import {ProveedorService} from '../../../services/services.index';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-prodprov',
  templateUrl: './agg-prodprov.component.html',
  styles: []
})
export class AggProdprovComponent implements OnInit {
  public formprodprov:FormGroup;
  
  public estado: boolean=false;
  public params;
  public prod: any=[];
  public prov: any=[];
  constructor(private prodprovServices: ProdproveeService, private router:Router,
    private activatedRouter: ActivatedRoute,private productoServices: ProductoService,
    private proveedorServices: ProveedorService,private _fb:FormBuilder) { }

    ngOnInit() {
      this.formprodprov = this._fb.group({
        id_producto:['',[Validators.required]],
        id_proveedor:['',[Validators.required]],
      });
      this.getListProd();
      this.getListProv();

      this.params=this.activatedRouter.snapshot.params.id;
      if(this.params){
        this.getOne(this.params);
        this.estado=true;
      }
      
    }
    get id_producto(){ return this.formprodprov.get('id_producto');}
    get id_proveedor(){return this.formprodprov.get('id_proveedor');}

    submit(){
      if(this.formprodprov.valid){
        if(this.estado===true){
          this.updateProdprov(this.formprodprov.value);
        }else{
          this.saveProdprov(this.formprodprov.value);
        }
      }
    }
    cancelar(){
      this.router.navigate(['/prodprovee'])
    }
    getListProd(){
      this.productoServices.getProd()
        .subscribe(
          res=>{
            this.prod = res;
          },
          err=>console.error(err)
        );
    }
    getListProv(){
      this.proveedorServices.getProv()
        .subscribe(
          res=>{
            this.prov = res;
          },
          err=>console.error(err)
        );
    }



    saveProdprov(prodprov){
      
  
      this.prodprovServices.createProdprov(prodprov)
      .subscribe(
        res=>{
          this.router.navigate(['/prodprovee']);
        },
        err=> console.error(err)
      );
      
    }
  
    getOne(id:number | string){
      this.prodprovServices.getOneProdprov(id)
        .subscribe(
          res=>{
            this.formprodprov.patchValue(res);
  
          },
          err=>console.error(err)
        );
    }
  
    updateProdprov(prodprov){
      this.prodprovServices.updateProdprov(this.params,prodprov)
        .subscribe(
          res =>{
            this.router.navigate(['/prodprovee']);
          },
          err=> console.error(err)
        );
    }
  

}
