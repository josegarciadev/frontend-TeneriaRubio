export interface SalidaEmpleado{
    id_salida?:number | string;
    id_empleado?:number | string;
    fecha_salida?:Date,
    descripcion?:string;
    id_user?:number | string;
    nombre_user?:string;
}