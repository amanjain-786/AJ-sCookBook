//this is the file which connects access the database which we have connected and now we write the functions which update the data in this bro so let's do it
const { ObjectId } = require('mongodb');
const {getDb}=require('../database/database');
const collectionName='posts';

class Posts{
    constructor(data){
        this.name=data.name;
        this.imageUrl=data.imageUrl;
        this.cookName=data.cookName;
        this.description=data.description;
        this.type=data.type;
        this.category=data.category;
        this.ingredients=data.ingredients;
        this.steps=data.steps;
        this.servingSize=data.servingSize;
        this.preparationTime=data.preparationTime;
        this.likes=0;
    }

    save(){
        return getDb().collection(collectionName).insertOne(this);
    }

    static getPosts(){
        return new Promise(async(resolve,reject)=>{
            try{
                let data=await getDb().collection(collectionName).find({}).toArray();
                console.log("i had been asked for all the posts and i have found them bro so i am delivering it")
                resolve(data);
            }
            catch(err){
                reject(err);
            }
        })
    }

    static getPost(id){
        return new Promise(async(resolve,rejct)=>{
            try{
                let data=await getDb().collection(collectionName).find({
                    _id:new ObjectId(id)
                }).toArray();
                console.log(data);
                resolve(data[0]);
            }
            catch(err){
                reject(err);
            }
        })
    }



    static deletePost(_id){
        let id= new ObjectId(_id);
        return new Promise(async(resolve,reject)=>{
            getDb().collection(collectionName).deleteOne({
                _id:id
            })
            .then((data)=>{
                console.log(data);
                resolve('the data has been deleted for one post');
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }


    static updatePost(_id,data){
        let id=new ObjectId(_id);
        getDb().collection(collectionName).updateOne(
            {_id:id},
            {$set:{
                name:data.name,
                imageUrl:data.imageUrl,
                steps:data.steps,
                type:data.type,
                description:data.description,
                category:data.category,
                servingSize:data.servingSize,
                preparationTime:data.preparationTime,
                cookName:data.cookName
            }}
            )
        .then((data)=>{
            console.log('data updated');
            return(data);
        })
        .catch((err)=>{
            return(err);
        })
    }


    static find(filter){
        return getDb().collection(collectionName).find(filter).toArray();
    }


}


module.exports=Posts;