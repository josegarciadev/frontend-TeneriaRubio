import { Component, OnInit } from '@angular/core';
import {EntradalineaService} from '../../../services/services.index';
import {EmpleadosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {EntradaLinea} from '../../../Models/entradaLinea';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-ent-linea',
  templateUrl: './agg-ent-linea.component.html',
  styles: []
})
export class AggEntLineaComponent implements OnInit {
  public entradaForm:FormGroup;
  
  
  public estado :boolean=false;
  public query1:any=[];
  public query2:any =[];
  public query3:any =[];
  public orden: string | number;
  public user:any ;
  public params;
constructor(private entradalineaService: EntradalineaService,private empleadosService:EmpleadosService,private lineaService:LineaService,private router:Router,
  private activatedRouter:ActivatedRoute,private _fb:FormBuilder) { }

ngOnInit() {
  this.entradaForm=this._fb.group({
    nro_orden:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
    id_linea:['',[Validators.required]],
    id_lineaprod:['',[Validators.required]],
    cantidad:['',[Validators.required,Validators.minLength(1),Validators.maxLength(11)]],
    id_empleado:['',[Validators.required]],
  });
  this.getListLinea();
  this.getListEmpleado();
  this.user= JSON.parse(sessionStorage.getItem('user'));
  
  this.params=this.activatedRouter.snapshot.params.id;
  if(this.params){
    this.getOne(this.params);
    this.estado=true;
    
  }
  
}
get nro_orden(){return this.entradaForm.get('nro_orden');}
get id_linea(){return this.entradaForm.get('id_linea');}
get id_lineaprod(){return this.entradaForm.get('id_lineaprod');}
get cantidad(){return this.entradaForm.get('cantidad');}
get id_empleado(){return this.entradaForm.get('id_empleado');}
submit(){
  if(this.entradaForm.valid){

    if(this.estado===true){
      this.updateEntLinea(this.entradaForm.value);
    }else{
      this.saveEntLinea(this.entradaForm.value);
    }
  }
  
}

cancelar(){
  this.router.navigate(['/entradaLinea']);
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
getListEmpleado(){
  this.empleadosService.getEmp()
    .subscribe(
      res=>{
        this.query3 = res;
      },
      err=>console.error(err)
    );
}
getListProdprov(id:any){
  
  this.entradalineaService.getLinea(id)
    .subscribe(
      res=>{
        this.query2 = res;
      },
      err=>console.error(err)
    );
}

saveEntLinea(entrada){
  swal("¿Esta seguro de crear la entrada de linea?")
  .then((value) => {
    

    entrada.id_user = this.user.id_usuario;
    entrada.nombre_user= this.user.user;
    this.entradalineaService.createEntLinea(entrada)
    .subscribe(
      res=>{ 
        swal('Entrada de linea creado con exito!');
        this.router.navigate(['/entradaLinea']);
      },
      err=> console.error(err)
    );
   
  });
      
}


getOne(id:number | string){
  this.entradalineaService.getOneEntLinea(id)
    .subscribe(
      res=>{
        this.entradaForm.patchValue(res);
        
        let id = this.entradaForm.value.id_linea;
         this.getListProdprov(id);
        
      },
      err=>console.error(err)
    );
}

updateEntLinea(entrada){

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      
      entrada.id_user = this.user.id_usuario;
      entrada.nombre_user = this.user.user;
  
      this.entradalineaService.updateEntLinea(this.params, entrada)
              .subscribe(
                res =>{
                swal('Perfecto','La entrada de linea fue actualizado con exito','success');
                this.router.navigate(['/entradaLinea']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }

}
