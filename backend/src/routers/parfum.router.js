import { Router } from "express";
import { sample_parfums, sample_Tags } from "../data.js";


const router =Router();
router.get('/', (req, res) =>{
res.send(sample_parfums);
});



export default router;