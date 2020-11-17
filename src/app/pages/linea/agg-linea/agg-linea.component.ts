import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from '../../../services/services.index';
import {LineaService} from '../../../services/services.index';
import {Linea} from '../../../Models/linea';
import {Router,ActivatedRoute}  from '@angular/router';
@Component({
  selector: 'app-agg-linea',
  templateUrl: './agg-linea.component.html',
  styles: []
})
export class AggLineaComponent implements OnInit {
  public linea:Linea={
    id_linea:0,
    nombre_linea:'',
    id_departamento: 0,
    descripcion_linea:''
  }
  public query:any=[];
  public estado: boolean=false;
  constructor(private lineaService: LineaService,private departamentoServices: DepartamentosService, private router:Router,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.getListDep();
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
    
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

  saveLinea(){
    delete this.linea.id_linea;
    delete this.linea.nombre_departamento;
    delete this.linea.descripcion_dep;

    this.lineaService.createLinea(this.linea)
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
          this.linea=res;

        },
        err=>console.error(err)
      );
  }

  updateLinea(){
    delete this.linea.nombre_departamento;
    delete this.linea.descripcion_dep; 

    this.lineaService.updateLinea(this.linea.id_linea, this.linea)
      .subscribe(
        res =>{
          this.router.navigate(['/linea']);
        },
        err=> console.error(err)
      );
  }


}
