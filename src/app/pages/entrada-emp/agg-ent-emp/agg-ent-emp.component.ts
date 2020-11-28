import { Component, OnInit } from '@angular/core';
import {EmpleadosService} from '../../../services/services.index';
import {EntradaempleadosService} from '../../../services/services.index';
import {EntradaEmpleado} from '../../../Models/entradaEmpleado';
import {Router,ActivatedRoute}  from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-ent-emp',
  templateUrl: './agg-ent-emp.component.html',
  styles: []
})
export class AggEntEmpComponent implements OnInit {
  public entradaEmpForm : FormGroup;
  
  public estado :boolean=false;
  public query:any=[];
  public params;
  public user:any = JSON.parse(sessionStorage.getItem('user'));
constructor(private empleadosServices: EmpleadosService,private router:Router, private entradaempleadosService:EntradaempleadosService,
  private activatedRouter:ActivatedRoute, private _fb:FormBuilder) { }

ngOnInit() {
    this.entradaEmpForm=this._fb.group({
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

get id_empleado(){return this.entradaEmpForm.get('id_empleado')}
get descripcion(){return this.entradaEmpForm.get('descripcion')}
submit(){
  if(this.entradaEmpForm.valid){

    if(this.estado===true){
      this.updateEntEmp(this.entradaEmpForm.value);
    }else{
      this.saveEntEmp(this.entradaEmpForm.value);
    }
  }
}

cancelar(){
  this.router.navigate(['/entradaEmpleado']);
}
saveEntEmp(entrada){
  swal({
    title:'Agregar',
    text: '¿Seguro de agregar la entrada del empleado?',
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
      entrada.id_user = this.user.id_usuario;
      entrada.nombre_user= this.user.user;
      this.entradaempleadosService.createEntEmp(entrada)
      .subscribe(
        res=>{ 
          swal('Empleado creado con exito!');
          this.router.navigate(['/entradaEmpleado']);
        },
        err=> console.error(err)
      );
    }
    if(value==='cancelar'){
      swal.close();
    }
    
   
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
  this.entradaempleadosService.getOneEntEmp(id)
    .subscribe(
      res=>{
        this.entradaEmpForm.patchValue(res);
      },
      err=>console.error(err)
    );
}



updateEntEmp(entrada){

  swal({
    title:'Actualizar',
    text: '¿Seguro de actualizar la entrada del empleado?',
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
        entrada.id_user = this.user.id_usuario;
        entrada.nombre_user = this.user.user;
    
        this.entradaempleadosService.updateEntEmp(this.params, entrada)
                .subscribe(
                  res =>{
                  swal('Perfecto','La Entrada del empleado fue actualizado con exito','success');
                  this.router.navigate(['/entradaEmpleado']);
                  console.log(res);},
                err=> console.error(err)
      );
     }
     if(value==='cancelar'){
       swal.close();
     }
      
      
    });
  }

}
