import { Router } from "express";
import { sample_parfums, sample_Tags } from "../data.js";


const router =Router();
router.get('/', (req, res) =>{
res.send(sample_parfums);
});

router.get('/tags',(req ,res ) =>{res.send(sample_Tags);

});


router.get('/search/:searchTerm',(req , res) => {
    const {searchTerm} =req.params;
    const parfums = sample_parfums.filter (item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(parfums);
});


router.get('/tag/:tag',(req, res) => {
const {tag} = req.params;
const parfums = sample_parfums.filter(item => item.tags?.includes(tag));
res.send(parfums); 
});


router.get('/:parfumId',(req,res)=>
{
    const {parfumId} = req.params;
   const parfum = sample_parfums.find(item => item.id === parfumId);
   res.send(parfum);
    
});

export default router;