import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../../services/services.index';
import {Usuario} from '../../../Models/usuario';
import {Router,ActivatedRoute}  from '@angular/router';
import swal from 'sweetalert';
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
    foto:'',
    rol:0,
    id_user:0,
    nombre_user:''
  }
  public user:any = JSON.parse(localStorage.getItem('usuario'));
  public query:any=[];
  public estado :boolean=false;
  constructor(private usuarioServices: UsuarioService,private router:Router,private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.gerRol();
    const params=this.activatedRouter.snapshot.params.id;
    if(params){
      this.getOne(params);
      this.estado=true;
    }
  }

  saveUser(){
    swal("¿Esta seguro de crear el usuario")
    .then((value) => {
      delete this.usuario.id_usuario;
  
      this.usuario.id_user = this.user.id_usuario;
      this.usuario.nombre_user= this.user.user;
      this.usuarioServices.createUser(this.usuario)
      .subscribe(
        res=>{ 
          swal('Usuario creado con exito!');
          
          this.router.navigate(['/usuarios']);
        },
        err=> console.error(err)
      );
     
    });
        
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
  gerRol(){
    this.usuarioServices.getrol().subscribe(
      res=>{
        this.query = res;
        console.log(this.query);
      },
      err => console.error(err)
    )
  }
  

  updateUser(){

    swal("Actualizar",'¿Esta seguro de actualizar?', 'warning')
      .then((value) => {
        delete this.usuario.fecha_registro;
        
        this.usuario.id_user = this.user.id_usuario;
        this.usuario.nombre_user = this.user.user;
        
        this.usuarioServices.updateUser(this.usuario.id_usuario, this.usuario)
                .subscribe(
                  res =>{
                  swal('Perfecto','El usuario fue actualizado con exito','success');
                  this.router.navigate(['/usuarios']);
                  console.log(res);},
                 err=> console.error(err)
      );
      });
    }
}
