import { Request, Response, NextFunction } from "express";
import client from "../config/redis";

export const rateLimiter = async (req:Request, res:Response, next: NextFunction) =>{
    const ip = req.ip as string;

    const request = await client.incr(ip);

    if(request === 1){
        await client.expire(ip, 60); 
    }

    if(request > 5){
        return res.status(429).json({
            message: "Too many requests"
        })
    }

    next();
}