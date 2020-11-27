import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {Linea} from '../../../Models/linea';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
@Component({
  selector: 'app-agg-linea',
  templateUrl: './agg-linea.component.html',
  styles: []
})
export class AggLineaComponent implements OnInit {
  public lineaForm: FormGroup;
  
  public query:any=[];
  public params;
  public estado: boolean=false;
  constructor(private lineaService: LineaService,private departamentoServices: DepartamentosService, private router:Router,
    private activatedRouter: ActivatedRoute,private _fb:FormBuilder) { }

  ngOnInit() {
    this.lineaForm=this._fb.group({
      nombre_linea:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      id_departamento:['',[Validators.required]],
      descripcion_linea:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]]
    });
    this.getListDep();
    this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
    
  }
  get nombre_linea(){return this.lineaForm.get('nombre_linea');}
  get id_departamento(){return this.lineaForm.get('id_departamento');}
  get descripcion_linea(){return this.lineaForm.get('descripcion_linea');}
  submit(){
    if(this.lineaForm.valid){
      if(this.estado===true){
        this.updateLinea(this.lineaForm.value);
      }else{
        this.saveLinea(this.lineaForm.value);
      }
    }
  }
  cancelar(){
    this.router.navigate(['/linea']);
  }

  getListDep(){
    this.departamentoServices.getDep()
      .subscribe(
        res=>{
          this.query = res;
        },
        err=>console.error(err)
      );
  }

  saveLinea(linea){
  

    this.lineaService.createLinea(linea)
    .subscribe(
      res=>{
        this.router.navigate(['/linea']);
      },
      err=> console.error(err)
    );
    
  }

  getOne(id:number | string){
    this.lineaService.getOneLinea(id)
      .subscribe(
        res=>{
          this.lineaForm.patchValue(res);

        },
        err=>console.error(err)
      );
  }

  updateLinea(linea){
   

    this.lineaService.updateLinea(this.params, linea)
      .subscribe(
        res =>{
          this.router.navigate(['/linea']);
        },
        err=> console.error(err)
      );
  }


}
