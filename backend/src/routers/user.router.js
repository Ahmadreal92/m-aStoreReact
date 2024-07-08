import { Router } from 'express';

import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';
import handler from 'express-async-handler';
import { UserModel } from '../models/user.model.js';
import bcrypt from 'bcryptjs';



const router = Router();


router.post('/login', (async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
      res.json(generateTokenResponse(user));
      return;
    
}
res.status(BAD_REQUEST).json('Username or Password is invalid')
}));

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
        id: user.id,
        email:user.email,
        isAdmin :user.isAdmin,
    },
process.env.JWT_SECRET,{
expiresIn : '1d',
}
);
return {
    id : user.id,
    email:user.email,
    name:user.name,
    address:user.address,
    isAdmin:user.isAdmin,
    token,
}
}

export default router;