import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../../services/services.index';
import {Departamentos} from '../../../Models/departamentos';
import {Router,ActivatedRoute}  from '@angular/router';

@Component({
  selector: 'app-agg-dep',
  templateUrl: './agg-dep.component.html',
  styles: []
})
export class AggDepComponent implements OnInit {


  public departamento:Departamentos={
    id_departamento: 0,
    nombre_departamento:'',
    descripcion_dep:''
  }

  public estado: boolean=false;
  constructor(private departamentoServices: DepartamentosService, private router:Router,
    private activatedRouter: ActivatedRoute) {

   }

  ngOnInit() {
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
    
  }

  saveDep(){
    delete this.departamento.id_departamento;

    this.departamentoServices.createDep(this.departamento)
    .subscribe(
      res=>{
        this.router.navigate(['/departamentos']);
      },
      err=> console.error(err)
    );
    
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
    this.departamentoServices.updateDep(this.departamento.id_departamento, this.departamento)
      .subscribe(
        res =>{
          this.router.navigate(['/departamentos']);
        },
        err=> console.error(err)
      );
  }

}
