import app from './app';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';

const PORT= process.env.PORT || 5000;

connectDB().then(async () =>{
    await connectRedis();
    
    app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
    })
});