const path=require('path');
const express=require('express');
const router=express.Router();
const Posts=require('../models/posts.js')

//this renders the page on which the user can add a new post-------------------------------------------------------
router.get('/addpost',(req,res,next)=>{
    res.render('addpost');
})




//on the above page is a from which when submitted refers to this endpoint ------------------------------------------
router.post('/addpost',(req,res,next)=>{
    //req.body gives me the content of the form bro
    // console.log(req.body);
    const data=req.body;
    let steps=data.steps;
    data.steps=steps.split("\r\n");
    data.ingredients=(data.ingredients).split(",");
    //now i have my object ready now i just have to put this into the database but first checking it bro so let's do it
    console.log(data);
    let newPost=new Posts(data);

    //now we need to save this and the save() return a promise which we need to handle this bro
    newPost.save()
    .then(()=>{
        console.log("data added for the new post successfully");
        //this takes us to the new post page bro
        res.redirect('/posts/addpost');
    })
    .catch((err)=>{
        console.log('here i have an error in adding a new post come and resolve me');
        next();
    })
})


router.get('/explore',(req,res,next)=>{
    //here i have to return all data which i have for each of the post which i have bro 
    //for this i have to connect to the models which i have made as they only has access to the database to which i have connected
    Posts.getPosts()
    .then((data)=>{
        // console.log(data);
        res.render('explore',{
            data:data
        });
    })
    .catch((err)=>{
        console.log('i have an error in fetching the posts');
        next();
    })
})



//this returns the data of the single post bro and sends it onto a new page which i have made
router.get('/getpost',(req,res,next)=>{
    console.log(req.query._id);
    //i now have the id and now i have to display a new page which show only one recepie bro 
    // res.redirect('/posts/explore');
    Posts.getPost(req.query._id)
    .then((data)=>{
        console.log(`data found for recepie id${req.query._id}`);
        res.render('singlePost',{
            data:data
        });        
    })
    .catch((err)=>{
        console.log('we have an erro in fetching the single record');
        next();
    })
})




router.get('/delete',async(req,res,next)=>{
    console.log(req.query._id);
    try{
        let temp=await Posts.deletePost(req.query._id);
        console.log(temp);
        let data=await Posts.getPosts();
        console.log(data);
        res.send(data);
    }
    catch(err){
        res.send(reject(err));
    }
})




router.get('/updatepost',async(req,res,next)=>{
    let id=req.query._id;
    try{
        let data=await Posts.getPost(id);
        res.render('updatePost',{
            data:data
        });
    }
    catch(err){
        console.log(err);
        next();
    }
})


router.post('/updatepost',async(req,res,next)=>{
    const data=req.body;//this gives us the data bro
    //we have the id and now we just have to update it bro
    //we update the post and take to the single post page which we have made man so that the person can check the shit out  
    let steps=data.steps;
    data.steps=steps.split("\r\n");
    data.ingredients=(data.ingredients).split(",");
    let _id=data._id;
    let updatedData={
        name:data.name,
        imageUrl:data.imageUrl,
        description:data.description,
        type:data.type,
        category:data.category,
        ingredients:data.ingredients,
        steps:data.steps,
        servingSize:data.servingSize,
        preparationTime:data.preparationTime,
        cookName:data.cookName
    }
    try{
        let temp=await Posts.updatePost(_id,updatedData);
        console.log(temp);
        console.log('data updated');
        res.redirect(`/posts/getpost?_id=${_id}`);
    }
    catch(err){
        console.log(err);
        console.log("couldn't update bro ");
        next();
    }
})


router.get('/filter',(req,res,next)=>{
    let category=req.query.category;
    //here i have to get the data using the models which i have made 
    //i will give the object jiske upar i need the data 
    //and then after getting data i will send that to explore bro taking sab mast chal jae man.
    Posts.find({category:category})
    .then((data)=>{
        res.render('filtered',{
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        next();
    })
})


module.exports=router;