import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../../services/services.index';
import swal from 'sweetalert';
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
      swal({
        title:'Agregar',
        text: '¿Seguro de agregar el producto proveedor?',
        icon:'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancelar: {text:'Cancelar',className:'sweet-warning'},
          confirmar: {text:'Confirmar',className:'sweet-success'},
        },
      })
        .then((value) => {
          if(value==='confirmar'){
            this.prodprovServices.createProdprov(prodprov)
            .subscribe(
              res=>{
                this.router.navigate(['/prodprovee']);
                swal('Perfecto','El producto proveedor fue agregado con exito','success');
              },
              err=> console.error(err)
            );
          }
          if(value==='cancelar'){
            swal.close();
          }
          
        });
  
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

      swal({
        title:'actualizar',
        text: '¿Seguro de actualizar el producto proveedor?',
        icon:'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
          cancelar: {text:'Cancelar',className:'sweet-warning'},
          confirmar: {text:'Confirmar',className:'sweet-success'},
        },
      })
        .then((value) => {
          if(value==='confirmar'){
            this.prodprovServices.updateProdprov(this.params,prodprov)
              .subscribe(
                res =>{
                  this.router.navigate(['/prodprovee']);
                  swal('Perfecto','El producto proveedor fue actualizado con exito','success');
                },
                err=> console.error(err)
              );
          }
          if(value==='cancelar'){
            swal.close();
          }
          
        });

      
    }
  

}
