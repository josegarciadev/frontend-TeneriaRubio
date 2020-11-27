import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../../services/services.index';
import {Departamentos} from '../../../Models/departamentos';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-dep',
  templateUrl: './agg-dep.component.html',
  styles: []
})
export class AggDepComponent implements OnInit {

  constructor(private departamentoServices: DepartamentosService, private router:Router,
    private activatedRouter: ActivatedRoute,private formBuilder: FormBuilder) {
}
  

  public estado: boolean=false;
  public prueba:any = JSON.parse(sessionStorage.getItem('usuario'));
  public params;
   public departamentoForm:FormGroup; 
  ngOnInit() {
    this.departamentoForm = this.formBuilder.group({
    nombre_departamento: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
    descripcion_dep: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(60)]]
  });
    
   this.params=this.activatedRouter.snapshot.params.id;
    if(this.params){
      this.getOne(this.params);
      this.estado=true;
    }
    
  }

  get nombredepartamento(){
    return this.departamentoForm.get('nombre_departamento');
  }
  get descripciondep(){
    return this.departamentoForm.get('descripcion_dep');
  }
  submit(){
    if(this.departamentoForm.valid){

      if(this.estado===true){
        this.updateDep(this.departamentoForm.value);
      }else{
        this.saveDep(this.departamentoForm.value);
      }
    }
  }
  saveDep(departamento){
    
    swal("¿Esta seguro de crear el departamento?")
    .then((value) => {
      this.departamentoServices.createDep(departamento)
      .subscribe(
        res=>{ 
          swal('Departamento creado con exito!');
          
          this.router.navigate(['/departamentos']);
        },
        err=> console.error(err)
      );
     
    });
        
  }
  cancelar(){
    this.router.navigate(['/departamentos']);
  }
  getOne(id:number | string){
    this.departamentoServices.getOneDep(id)
      .subscribe(
        res=>{
          this.departamentoForm.patchValue(res);

        },
        err=>console.error(err)
      );
  }

  updateDep(departamento){

     swal("Actualizar",`¿Esta seguro de actualizar? \n \n Departamento: ${departamento.nombre_departamento} \n Descripcion: ${departamento.descripcion_dep}`, 'warning')
     .then((value) => {
       this.departamentoServices.updateDep(this.params,departamento)
       .subscribe(
         res =>{
           swal('Perfecto','El departamento fue actualizado con exito','success');
           this.router.navigate(['/departamentos']);
         },
         err=> console.error(err)
      );
      
     });
    
  }

}
