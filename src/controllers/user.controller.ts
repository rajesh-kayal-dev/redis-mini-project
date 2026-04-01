import { Request, Response } from "express";
import User from "../models/user.model";
import client from "../config/redis";

export const createUser = async (req:Request, res: Response)=>{
    try {
        const user = await User.create(req.body);

        await client.del("users:all"); 
        console.log('✅ List cache invalidated (New User Created)');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}

export const getAllUser = async (req:Request, res:Response)=>{
    try {
        const cacheKey = "users:all";
        
        const cachedUser = await client.get(cacheKey);

        if(cachedUser){
            console.log('✅ Cache HIT (ALL Users)');
            return res.json(JSON.parse(cachedUser))
        }

        console.log('❌ Cache MISS (All Users)');

        const user = await User.find();
        
        await client.set(cacheKey, JSON.stringify(user),{
            EX:60,
        });

        res.json(user);

    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ message: 'Error fetching user' });
    }
} 

export const getUser = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params as {id: string};

        const cacheduser = await client.get(id);

        if(cacheduser){
            console.log('✅ Cache HIT');
            return res.json(JSON.parse(cacheduser));
        }

        console.log('❌ Cache MISS');

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        await client.set(id, JSON.stringify(user),{
            EX: 60,
        })
        
        res.json(user)
    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ message: 'Error fetching user' });
    }
} 

export const updateUser = async (req:Request, res: Response)=>{
    try {
        const {id} = req.params as {id: string};

    const updateUser = await User.findByIdAndUpdate(
        id,
        req.body,
        {returnDocument: 'after'}
    );

    if(!updateUser){
        return res.status(404).json({ message: 'User not found' });
    }

    await client.del(id);
    await client.del("users:all"); 

    console.log('✅ Individual and List caches invalidated');

    res.json(updateUser);

    } catch (error) {
        res.status(500).json({
            message: 'Error updating user'
        });
    }
}