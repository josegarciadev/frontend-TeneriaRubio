import { Component, OnInit } from '@angular/core';
import {SalidalineaService} from '../../../services/services.index';
import {EmpleadosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {SalidaLinea} from '../../../Models/salidaLinea';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-sal-linea',
  templateUrl: './agg-sal-linea.component.html',
  styles: []
})
export class AggSalLineaComponent implements OnInit {
  public salidaForm:FormGroup;
  
  public orden :number | string;
  public estado :boolean=false;
  public query1:any=[];
  public query2:any =[];
  public query3:any =[];
  public params;
  public user:any = JSON.parse(sessionStorage.getItem('user'));
constructor(private salidalineaService: SalidalineaService,private empleadosService:EmpleadosService,private lineaService:LineaService,private router:Router,
  private activatedRouter:ActivatedRoute,private _fb: FormBuilder) { }

ngOnInit() {
  this.salidaForm=this._fb.group({
    nro_orden:['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
    id_linea:['',[Validators.required]],
    id_lineaprod:['',[Validators.required]],
    cantidad:['',[Validators.required,Validators.minLength(1),Validators.maxLength(11)]],
    id_empleado:['',[Validators.required]],
  });
  this.getListLinea();
  this.getListEmpleado();
  
  this.params=this.activatedRouter.snapshot.params.id;
  if(this.params){
    this.getOne(this.params);
    this.estado=true;
    
  }
  
}
get nro_orden(){return this.salidaForm.get('nro_orden');}
get id_linea(){return this.salidaForm.get('id_linea');}
get id_lineaprod(){return this.salidaForm.get('id_lineaprod');}
get cantidad(){return this.salidaForm.get('cantidad');}
get id_empleado(){return this.salidaForm.get('id_empleado');}
submit(){
  if(this.salidaForm.valid){

    if(this.estado===true){
      this.updateSalLinea(this.salidaForm.value);
    }else{
      this.saveSalLinea(this.salidaForm.value);
    }
  }
  
}
cancelar(){
  this.router.navigate(['/salidaLinea']);
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
  
  this.salidalineaService.getLinea(id)
    .subscribe(
      res=>{
        this.query2 = res;
      },
      err=>console.error(err)
    );
}
saveSalLinea(salida){
  swal("¿Esta seguro de crear la entrada de linea?")
  .then((value) => {
    

    salida.id_user = this.user.id_usuario;
    salida.nombre_user= this.user.user;
    this.salidalineaService.createSalLinea(salida)
    .subscribe(
      res=>{ 
        let resp:any= res;
        console.log(resp);
        if(resp.message==false){
          swal('Atención!','La cantidad no es valida','warning');
        }else{
          swal('Correcto','Salida de linea creado con exito!','success');
          this.router.navigate(['/salidaLinea']);
        }
       
      },
      err=> console.error(err)
    );
   
  });
      
}


getOne(id:number | string){
  this.salidalineaService.getOneSalLinea(id)
    .subscribe(
      res=>{
        this.salidaForm.patchValue(res);
       
        let id = this.salidaForm.value.id_linea;
         this.getListProdprov(id);
         
      },
      err=>console.error(err)
    );
}
updateSalLinea(salida){

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
      
     
      salida.id_user = this.user.id_usuario;
      salida.nombre_user = this.user.user;
    
      this.salidalineaService.updateSalLinea(this.params, salida)
              .subscribe(
                res =>{
                swal('Perfecto','La Salida de linea fue actualizado con exito','success');
                this.router.navigate(['/salidaLinea']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }

}
