import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import { BAD_REQUEST } from '../constants/httpStatus.js';


const router = Router();


router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(
        user => user.email === email && user.password === password
    );
    if(user){
      res.json(generateTokenResponse(user));
      return;
    
}
res.status(BAD_REQUEST).json('Username or Password is invalid')
});

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
        id: user.id,
        email:user.email,
        isAdmin :user.isAdmin,
    },
'SomeRandomText',{
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