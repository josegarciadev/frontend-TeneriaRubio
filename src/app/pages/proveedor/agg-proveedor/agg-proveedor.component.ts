import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../../services/services.index';
import swal from 'sweetalert';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-proveedor',
  templateUrl: './agg-proveedor.component.html',
  styles: []
})
export class AggProveedorComponent implements OnInit {
  public formProv: FormGroup;
 
  public estado: boolean=false;
  public params;
  constructor(private proveedorServices: ProveedorService, private router:Router,
    private activatedRouter: ActivatedRoute,private _fb:FormBuilder) { }

  ngOnInit() {
    this.formProv = this._fb.group({
      nombre_proveedor:['',[Validators.required,Validators.minLength(4),Validators.maxLength(70)]],
      descripcion_prov:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]]
    });

    this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
  }
  get nombre_proveedor(){return this.formProv.get('nombre_proveedor');}
  get descripcion_prov(){return this.formProv.get('descripcion_prov');}
  submit(){
    if(this.formProv.valid){
      if(this.estado===true){
        this.updateProv(this.formProv.value);
      }else{
        this.saveProv(this.formProv.value);
      }
    }
  }

  cancelar(){
    this.router.navigate(['/proveedor'])
  }
  saveProv(prov){
    swal({
      title:'Agregar',
      text: '¿Seguro de agregar el proveedor?',
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
          this.proveedorServices.createProv(prov)
          .subscribe(
            res=>{
              swal('Perfecto','El proveedor fue agregado con exito','success');
              this.router.navigate(['/proveedor']);
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
    this.proveedorServices.getOneProv(id)
      .subscribe(
        res=>{
          this.formProv.patchValue(res);

        },
        err=>console.error(err)
      );
  }

  updateProv(prov){

    swal({
      title:'Actualizar',
      text: '¿Seguro de actualizar el proveedor?',
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
          this.proveedorServices.updateProv(this.params, prov)
          .subscribe(
            res =>{
              swal('Perfecto','El proveedor fue actualizado con exito','success');
              this.router.navigate(['/proveedor']);
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
