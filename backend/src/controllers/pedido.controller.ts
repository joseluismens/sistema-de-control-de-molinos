import {Request, Response } from 'express';
import Pedido,{ IPedido } from "../models/pedido";
import User,{ IUser } from "../models/user";
import Photo,{ IPhoto } from "../models/photo";
import Mail from "../services/mail";
import { send } from 'process';


export async function getPedidos(req:Request,res:Response){
    const pedidos= await Pedido.find();
    if (!pedidos) return res.status(404).send({message:"Error al solicitar los pedidos"});

    return res.status(200).json(pedidos);
}
export async function getPedido(req:Request,res:Response){
    const {id}=req.params;
    const pedido=await Pedido.findById(id);

    if(!pedido) return res.status(404).send({message:"Error al obtener el pedido"});

    return res.status(200).json(pedido);
}
export async function deletePedido(req:Request,res:Response){
    const {id} = req.params;
    const pedido = await Pedido.findByIdAndDelete(id) as IPedido;

    if (!pedido) return res.status(404).send({message:"No se ha podido eliminar el pedido"});
    return res.status(200).json(pedido);
}
export async function updatePedido(req:Request,res:Response){
    const {id} = req.params;
    const {producto,cliente,cantidad,precio}= req.body;
    const update = await Pedido.findByIdAndUpdate(id,{producto,cliente,cantidad,precio});

    if(!update) return res.status(404).send({message:"No se ha podido actualizar la información"});

    return res.status(200).json(update);
}
export async function getPedidoByClient(req:Request,res:Response){
    const {id}=req.params;
    const pedidos = await Pedido.find({cliente:id});
    
    if(!pedidos) return res.status(404).send({message:"No se ha podido obtener la información"});
    return res.status(200).json(pedidos);
    
}
export async function createPedido(req:Request,res:Response){
    const {producto,cliente,cantidad,precio}=req.body;
    
    
    var product = await Photo.find({_id:producto},{title:1});
    if(!product) return res.status(404).json("El producto no existe");
    let nameProducto = product[0].title;
    var client= await User.find({_id:cliente},{_id:0,name:1});
    if(!client) return res.status(404).json("El cliente no existe");

    let nameClient=client[0].name;
    
    const newPedido= {producto,nameClient,nameProducto,cliente,cantidad,precio};
    const pedido= new Pedido(newPedido);
    if(!pedido) return res.status(400).json("Error al registrar el Pedido");
    await pedido.save();
    
    return res.json({
        message:"pedido guardado exitosamente!!",
        pedido
    })
    
}
export async function changeStatus(req:Request,res:Response){
    const {id} =req.params;
    const user = await Pedido.findOne({_id:id},{_id:0,cliente:1});

    if (!user) return res.status(404).json("EL pedido no tiene usuario");
    let userId= user.cliente;

    let dataUser = await User.findOne({_id:userId},{email:1});

    const pedido = await Pedido.findByIdAndUpdate(id,{status:true},{new:true});
    
    if(!pedido) return res.status(404).json("No existe el pedido");

    let email=dataUser?.email;
    if(!email) return res.status(400).json("No se ha podido enviar el email");

    Mail.to=email;
    Mail.subject = "Aprobación de Pedido : "+id,
    Mail.message=`
    <h4>Su Solicitud de pedido ha sido verificada y aprobada exitosamente</h4> <br>

    <p> Reiteramos que no olvide retirar su pedido <br>
    <h4>Gracias por preferir nuestros servicios</h4>
    </p> 
    `    
    const result = await Mail.sendMail();

    return res.status(200).send({message:"Su solicitud Ha sido aprobada exitosamente y se le ha notificado por email"});

    
   
}   

export async function getPedidosPendientes(req:Request,res:Response){
    const pedidos= await Pedido.find({status:false});
    if (!pedidos) return res.status(400).send({message:"Error al solicitar los pedidos"});
    
    
    return res.status(200).json(pedidos);
        
    
}

