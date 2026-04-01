import { Request, Response } from "express";
import User from "../models/user.model";
import client from "../config/redis";
import { CACHE_KEYS } from "../utils/cacheKeys";

export const createUser = async (req:Request, res: Response)=>{
    try {
        const user = await User.create(req.body);
        const cacheKey = CACHE_KEYS.USERS_ALL;
        await client.del(cacheKey); 

        console.log('✅ List cache invalidated (New User Created)');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}

export const getAllUser = async (req:Request, res:Response)=>{
    try {
        const cacheKey = CACHE_KEYS.USERS_ALL;
        
        const cachedUser = await client.get(cacheKey);

        if(cachedUser){
            console.log('✅ Cache HIT (ALL Users)  → returning from Redis"');
            return res.json(JSON.parse(cachedUser))
        }

        console.log('❌ Cache MISS (All Users) → fetching from DB');

        const user = await User.find();
        
        await client.setEx(cacheKey, 60, JSON.stringify(user));

        res.json(user);

    } catch (error) {
        console.error("Error in getUser:", error);
        res.status(500).json({ message: 'Error fetching user' });
    }
} 

export const getUser = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params as {id: string};

        const cacheKey = CACHE_KEYS.USER_SINGLE(id);

        const cacheduser = await client.get(cacheKey);

        if(cacheduser){
            console.log('✅ Cache HIT  → returning from Redis');
            return res.json(JSON.parse(cacheduser));
        }

        console.log('❌ Cache MISS → fetching from DB');

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        await client.setEx(cacheKey, 60, JSON.stringify(user))
        
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

     // Clear caches
        await client.del(CACHE_KEYS.USERS_ALL);
        await client.del(CACHE_KEYS.USER_SINGLE(id));

        console.log('Cache cleared');

    res.json(updateUser);

    } catch (error) {
        res.status(500).json({
            message: 'Error updating user'
        });
    }
}