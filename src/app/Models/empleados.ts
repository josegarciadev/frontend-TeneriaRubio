export interface Empleados{
    id_empleado?: number | string;
    cedula?: number | string;
    nombres?:string;
    genero?:string;
    fecha_nac?:Date;
    fecha_ing?:Date;
    direccion?:string;
    telefono?:string;
    id_departamento?:number | string;
    nombre_departamento?:string;
    descripcion_dep?:string;
    id_user?:number | string;
    nombre_user?: string;
}