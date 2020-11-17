import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../../services/services.index';
import {Proveedor} from '../../../Models/proveedor';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-proveedor',
  templateUrl: './agg-proveedor.component.html',
  styles: []
})
export class AggProveedorComponent implements OnInit {
  public proveedor:Proveedor={
    id_proveedor: 0,
    nombre_proveedor:'',
    descripcion_prov:''
  }
  public estado: boolean=false;
  constructor(private proveedorServices: ProveedorService, private router:Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
  }

  saveProv(){
    delete this.proveedor.id_proveedor;

    this.proveedorServices.createProv(this.proveedor)
    .subscribe(
      res=>{
        this.router.navigate(['/proveedor']);
      },
      err=> console.error(err)
    );
    
  }

  getOne(id:number | string){
    this.proveedorServices.getOneProv(id)
      .subscribe(
        res=>{
          this.proveedor=res;

        },
        err=>console.error(err)
      );
  }

  updateProv(){
    this.proveedorServices.updateProv(this.proveedor.id_proveedor, this.proveedor)
      .subscribe(
        res =>{
          this.router.navigate(['/proveedor']);
        },
        err=> console.error(err)
      );
  }

}
