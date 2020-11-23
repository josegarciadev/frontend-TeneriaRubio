import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../../services/services.index';
import {Departamentos} from '../../../Models/departamentos';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-agg-dep',
  templateUrl: './agg-dep.component.html',
  styles: []
})
export class AggDepComponent implements OnInit {


  public departamento:any={
    id_departamento: 0,
    nombre_departamento:'',
    descripcion_dep:''
  
  }

  public estado: boolean=false;
  public prueba:any = JSON.parse(localStorage.getItem('usuario'));
   
  constructor(private departamentoServices: DepartamentosService, private router:Router,
    private activatedRouter: ActivatedRoute) {

   }

  ngOnInit() {
    console.log(this.prueba);
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
    
  }

  saveDep(){
    swal("¿Esta seguro de crear el departamento?")
    .then((value) => {
      delete this.departamento.id_departamento;
      this.departamento.id_user = this.prueba.id_usuario;
      this.departamento.nombre_user= this.prueba.user;
      
      this.departamentoServices.createDep(this.departamento)
      .subscribe(
        res=>{ 
          swal('Departamento creado con exito!');
          console.log(this.departamento);
          this.router.navigate(['/departamentos']);
        },
        err=> console.error(err)
      );
     
    });
        
  }

  getOne(id:number | string){
    this.departamentoServices.getOneDep(id)
      .subscribe(
        res=>{
          this.departamento=res;

        },
        err=>console.error(err)
      );
  }

  updateDep(){
    swal("Actualizar",`¿Esta seguro de actualizar? \n \n Departamento: ${this.departamento.nombre_departamento} \n Descripcion: ${this.departamento.descripcion_dep}`, 'warning')
    .then((value) => {
      this.departamentoServices.updateDep(this.departamento.id_departamento, this.departamento)
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
