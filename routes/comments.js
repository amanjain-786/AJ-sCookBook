const path=require('path');
const express=require('express');
const router=express.Router();
const Comments=require('../models/comments');


router.post('/addcomment',(req,res,next)=>{
    //this will be an ajax request only so i have to add this and send that it has been added (by sending the data value bro) nothing else i have to do bro
    console.log(req.body);
    let newComment=new Comments(req.body);
    // res.send('comment added');
    newComment.save()
    .then((data)=>{
        console.log(data);
        console.log('the message has been added');
        res.statusCode=200;
        res.send(data);
    })
    .catch((err)=>{
        console.log(err);
        next();
    })
})


router.get('/getcomment',(req,res,next)=>{
    console.log(req.query.recepieId);
    const recepieId=req.query.recepieId;
    Comments.find({recepieId:recepieId})
    .then((data)=>{
        console.log('data found');
        res.statusCode=200;
        res.send(data);
    })
    .catch((err)=>{
        res.statusCode=404;
        res(err);
    })
})


module.exports=router;