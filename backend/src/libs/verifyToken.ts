import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

interface IPayload {
    _id: string;
    iat: number;
    role: string
}



export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {



    const token = req.header('token');
    if (!token) return res.status(401).json("Access denied");

    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    console.log(payload);
    next();

}