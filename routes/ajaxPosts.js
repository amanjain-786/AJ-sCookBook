const path=require('path');
const express=require('express');
const router=express.Router();
const Posts=require('../models/posts.js');




//this will send the data to front koi server side rendering nahi hogi
router.get('/getpost',async(req,res,next)=>{
    let id=req.query._id;
    try{
        let data=await Posts.getPost(id);
        res.statusCode=200;
        res.send(JSON.stringify(data));
    }
    catch(err){
        console.log(err);
        res.statusCode=404;
        res.send(new Error(err));
    }
})



module.exports=router;