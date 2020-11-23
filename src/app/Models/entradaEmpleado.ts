export interface EntradaEmpleado{
    id_entrada?:number | string;
    id_empleado?:number | string;
    fecha_entrada?:Date,
    descripcion?:string;
    id_user?:number | string;
    nombre_user?:string;
}