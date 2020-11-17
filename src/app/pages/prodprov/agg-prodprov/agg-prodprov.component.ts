import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../../services/services.index';
import {Prodprov} from '../../../Models/prodprov';
import {Router,ActivatedRoute}  from '@angular/router';
import {ProductoService} from '../../../services/services.index';
import {ProveedorService} from '../../../services/services.index';
@Component({
  selector: 'app-agg-prodprov',
  templateUrl: './agg-prodprov.component.html',
  styles: []
})
export class AggProdprovComponent implements OnInit {
  public prodprov:Prodprov={
    id_prodprov:0,
    id_producto: 0,
    id_proveedor:0,
   
  };
  public estado: boolean=false;
  public prod: any=[];
  public prov: any=[];
  constructor(private prodprovServices: ProdproveeService, private router:Router,
    private activatedRouter: ActivatedRoute,private productoServices: ProductoService,
    private proveedorServices: ProveedorService) { }

    ngOnInit() {
      this.getListProd();
      this.getListProv();

      const params=this.activatedRouter.snapshot.params.id;
      if(params){
        this.getOne(params);
        this.estado=true;
      }
      
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



    saveProdprov(){
      delete this.prodprov.id_prodprov;
  
      this.prodprovServices.createProdprov(this.prodprov)
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
            this.prodprov=res;
  
          },
          err=>console.error(err)
        );
    }
  
    updateProdprov(){
      this.prodprovServices.updateProdprov(this.prodprov.id_prodprov, this.prodprov)
        .subscribe(
          res =>{
            this.router.navigate(['/prodprovee']);
          },
          err=> console.error(err)
        );
    }
  

}
