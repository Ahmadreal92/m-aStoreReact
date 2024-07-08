import { Router } from "express";
import { ParfumModel } from "../models/parfum.model";
import handler from 'express-async-handler'

const router =Router();

router.get(
    '/', handler (async (req, res) => {
        const parfums = await ParfumModel.find({});
    res.send(parfums);
    })
);

router.get('/tags',handler( async (req ,res ) =>{
    const tags = await ParfumModel.aggregate([
        {
            $unwind:'$tags',
        },{
            $group:{
                _id:'$tags',
                count:{$sum:1},

            }
        },
        {
            $project:{
                _id:0 ,
                name: '$_id',
                count:'$count',
            },
        },
    ]).sort({count: -1});

    const all = {
        name: 'All',
        count: await ParfumModel.countDocuments(),
    };
    tags.unshift(all);
    res.send(tags);

}));


router.get('/search/:searchTerm', handler (async(req , res) => {
    const {searchTerm} =req.params;
    const searchRegex =new RegExp(searchTerm,'i');
    const parfums = await ParfumModel.find({name:{$regex: searchRegex}});
    res.send(parfums);
}));


router.get('/tag/:tag', handler(async(req, res) => {
    const {tag} = req.params;
    const parfums = await ParfumModel.find({tags: tag});
    res.send(parfums); 
    }));


router.get('/:parfumId', handler(async(req,res)=>
    {
        const {parfumId} = req.params;
       const parfum = await ParfumModel.findById(parfumId);
       res.send(parfum);
        
    }));

export default router;