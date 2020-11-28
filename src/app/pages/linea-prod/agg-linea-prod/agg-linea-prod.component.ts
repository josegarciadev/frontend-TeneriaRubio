import { Component, OnInit } from '@angular/core';
import {ProdproveeService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {LineaProdService} from '../../../services/services.index';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-linea-prod',
  templateUrl: './agg-linea-prod.component.html',
  styles: []
})
export class AggLineaProdComponent implements OnInit {
  public lineaprodForm:FormGroup;

  public lineaprod:any={
    id_lineaprod:0,
    id_linea:0,
    id_prodpro:0,
    existencia: 0,
  }
  public query1:any=[];
  public query2:any=[];
  public params;
  public estado: boolean=false;
  constructor(private lineaprodService: LineaProdService,private lineaService: LineaService, private router:Router,
    private activatedRouter: ActivatedRoute,private prodprovServices: ProdproveeService,private _fb:FormBuilder) { }

  ngOnInit() {
    this.lineaprodForm = this._fb.group({
      id_linea:['',[Validators.required]],
      id_prodpro:['',[Validators.required]],
      existencia:['',[Validators.required,Validators.minLength(1),Validators.maxLength(11)]],
    }); 
    this.getListLinea();
    this.getListProdprov();
    this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
    
  }
  get id_linea(){return this.lineaprodForm.get('id_linea');}
  get id_prodpro(){return this.lineaprodForm.get('id_prodpro');}
  get existencia(){return this.lineaprodForm.get('existencia');}
  submit(){
    if(this.lineaprodForm.valid){
      if(this.estado===true){
        this.updateLineaprod(this.lineaprodForm.value);
      }else{
        this.saveLineaprod(this.lineaprodForm.value);
      }
    }
  }
  cancelar(){
    this.router.navigate(['/lineaProd']);
  }
  getListLinea(){
    this.lineaService.getLinea()
      .subscribe(
        res=>{
          this.query1 = res;
        },
        err=>console.error(err)
      );
  }
  getListProdprov(){
    this.prodprovServices.getProdprov()
      .subscribe(
        res=>{
          this.query2 = res;
        },
        err=>console.error(err)
      );
  }

  saveLineaprod(lineaprod){
    swal({
      title:'Agregar',
      text: '¿Seguro de agregar la linea Producto?',
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
        this.lineaprodService.createLineaProd(lineaprod)
          .subscribe(
            res=>{
              this.router.navigate(['/lineaProd']);
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
    this.lineaprodService.getOneLineaProd(id)
      .subscribe(
        res=>{
          this.lineaprodForm.patchValue(res);

        },
        err=>console.error(err)
      );
  }

  updateLineaprod(lineaprod){
    swal({
      title:'Actualizar',
      text: '¿Seguro de actualizar la linea Producto?',
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
        this.lineaprodService.updateLineaProd(this.params,lineaprod)
          .subscribe(
            res =>{
              this.router.navigate(['/lineaProd']);
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
