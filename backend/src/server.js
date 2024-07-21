import express from 'express';
import cors from 'cors';
import parfumRouter from './routers/parfum.router.js';
import userRouter from './routers/user.router.js';
import dotenv from 'dotenv';
import orderRouter from './routers/order.router.js'



dotenv.config();
import { dbconnect } from './config/database.config.js';
dbconnect();
const app = express();
app.use(express.json());


app.use(
    cors({
        credentials:true,
        origin:['http://localhost:3000']
    })
);

app.use('/api/parfums',parfumRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);

const PORT =4000;
app.listen(PORT,()=>{
    console.log('listening on port '+ PORT);
}
);