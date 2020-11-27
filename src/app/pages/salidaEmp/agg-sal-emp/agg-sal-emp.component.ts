import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {SalidaempleadoService} from '../../../services/services.index';
import {SalidaEmpleado} from '../../../Models/salidaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-sal-emp',
  templateUrl: './agg-sal-emp.component.html',
  styles: []
})
export class AggSalEmpComponent implements OnInit {
  public salidaForm : FormGroup;
  
  public estado :boolean=false;
  public query:any=[];
  public params;
  public user:any = JSON.parse(sessionStorage.getItem('user'));

constructor(private empleadosServices: EmpleadosService,private router:Router, private salidaempleadoService:SalidaempleadoService,
  private activatedRouter:ActivatedRoute,private _fb:FormBuilder) { }

ngOnInit() {
  this.salidaForm=this._fb.group({
    id_empleado: ['',[Validators.required]],
    descripcion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
  });

  this.getList();
  this.params=this.activatedRouter.snapshot.params.id;
  if(this.params){
    this.getOne(this.params);
    this.estado=true;
  }
}

get id_empleado(){return this.salidaForm.get('id_empleado')}
get descripcion(){return this.salidaForm.get('descripcion')}
submit(){
  if(this.salidaForm.valid){

    if(this.estado===true){
      this.updateSalEmp(this.salidaForm.value);
    }else{
      this.saveSalEmp(this.salidaForm.value);
    }
  }
}
cancelar(){
  this.router.navigate(['/salidaEmpleado']);
}
saveSalEmp(salida){
  swal("¿Esta seguro de crear la salida de empleados?")
  .then((value) => {
  
    salida.id_user = this.user.id_usuario;
    salida.nombre_user= this.user.user;
    this.salidaempleadoService.createSalEmp(salida)
    .subscribe(
      res=>{ 
        swal('Empleado creado con exito!');
        this.router.navigate(['/salidaEmpleado']);
      },
      err=> console.error(err)
    );
   
  });
      
}


getList(){
  this.empleadosServices.getEmp()
    .subscribe(
      res=>{
        this.query = res;
      },
      err=>console.error(err)
    );
}

getOne(id:number | string){
  this.salidaempleadoService.getOneSalEmp(id)
    .subscribe(
      res=>{
        this.salidaForm.patchValue(res);
      },
      err=>console.error(err)
    );
}


updateSalEmp(salida){

  swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
    .then((value) => {
     
      
     salida.id_user = this.user.id_usuario;
     salida.nombre_user = this.user.user;
  
      this.salidaempleadoService.updateSalEmp(this.params,salida)
              .subscribe(
                res =>{
                swal('Perfecto','La Salida del empleado fue actualizado con exito','success');
                this.router.navigate(['/salidaEmpleado']);
                console.log(res);},
               err=> console.error(err)
    );
    });
  }
}
