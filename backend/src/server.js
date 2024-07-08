import express from 'express';
import cors from 'cors';
import parfumRouter from './routers/parfum.router.js';
import userRouter from './user.router.js';
import dotenv from 'dotenv';

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

const PORT =4000;
app.listen(PORT,()=>{
    console.log('listening on port '+ PORT);
}
);