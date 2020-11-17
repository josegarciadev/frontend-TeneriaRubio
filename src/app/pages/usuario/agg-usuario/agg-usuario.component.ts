import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../services/services.index';
import {Usuario} from '../../../Models/usuario';
import {Router,ActivatedRoute}  from '@angular/router';

@Component({
  selector: 'app-agg-usuario',
  templateUrl: './agg-usuario.component.html',
  styles: []
})
export class AggUsuarioComponent implements OnInit {
  public usuario:Usuario={
    id_usuario:0,
    cedula: 0,
    nombre:'',
    apellido:'',
    telefono:'',
    fecha_registro:new Date,
    correo_elec:'',
    user: '',
    pass:'',
    direccion:'',
    status:'',
    foto:''
  }

  public estado :boolean=false;
  constructor(private usuarioServices: UsuarioService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
  }
  saveUser(){
    delete this.usuario.id_usuario;
    
    
    this.usuarioServices.createUser(this.usuario)
    .subscribe(
      res=>{
        this.router.navigate(['/usuarios']);
      },
      err=> console.error(err)
    );
  }


  getOne(id:number | string){
    this.usuarioServices.getOneUser(id)
      .subscribe(
        res=>{
          this.usuario=res;
          console.log(this.usuario);
        },
        err=>console.error(err)
      );
  }

  updateUser(){
    delete this.usuario.fecha_registro;
  
    console.log(this.usuario);
    this.usuarioServices.updateUser(this.usuario.id_usuario, this.usuario)
      .subscribe(
        res =>{
         
          this.router.navigate(['/usuarios']);
        },
        err=> console.error(err)
      );
  }
}
