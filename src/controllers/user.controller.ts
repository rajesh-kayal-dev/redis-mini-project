import { Request, Response } from "express";
import User from "../models/user.model";

export const createUser = async (req:Request, res: Response)=>{
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}

export const getAllUser = async (req:Request, res:Response)=>{
    try {
        const user = await User.find();
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
} 

export const getUser = async (req:Request, res:Response)=>{
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
} 