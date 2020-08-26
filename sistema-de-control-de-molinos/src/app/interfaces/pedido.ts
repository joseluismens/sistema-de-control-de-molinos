export interface IPedido{
    _id?:string,
    name:string,
    nameProducto:string,
    producto:string,
    cliente:string,
    cantidad:number,
    precio:number,
    createdAt:Date;
}