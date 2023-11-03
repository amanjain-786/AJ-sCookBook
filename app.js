const express=require('express');
const app=express();
const hbs=require('hbs');
const {mongoConnect}=require('./database/database');
const port=5500;
const path=require('path');

//router paths
const postRouter=require('./routes/posts');
const ajaxPostRouter=require('./routes/ajaxPosts');
const commentRouter=require('./routes/comments');

//this is the setting up the partials in the hbs
hbs.registerPartials(__dirname + '/views/partials');


//giving some middle wares
app.set('view engine','hbs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'public')));

//setting up the routers
app.use('/posts',postRouter);
app.use('/ajax',ajaxPostRouter);
app.use('/comment',commentRouter);


app.get('/about',(req,res,next)=>{
    res.render('about');
})


//listening to the port
mongoConnect()
.then(()=>{
    console.log('we have conected to the server')
    app.listen(port,()=>{
        console.log(`app listening at http://localhost:${port}`);
    })
})