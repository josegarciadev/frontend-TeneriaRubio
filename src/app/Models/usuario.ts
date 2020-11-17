export interface Usuario{
    id_usuario?: number | string;
    cedula?: number | string;
    nombre?:string;
    apellido?:string;
    telefono?:string;
    fecha_registro?:Date;
    correo_elec?:string;
    user?: string;
    pass?:string;
    direccion?:string;
    status?:string;
    foto?:string;
}