const {ObjectId}=require('mongodb');
const {getDb}=require('../database/database');
const collectionName='comments';


class Comments{
    constructor(data){
        this.recepieId=data.id;
        this.writerName=data.name;
        this.comment=data.comment;
    }

    async save(){
        await getDb().collection(collectionName).insertOne(this);
        let data= await getDb().collection(collectionName).find(this).toArray();
        return(data[0]);
    }


    static find(filter){
        //this filter is the object on the basis of which i need to find the comment
        return new Promise(async(resolve,reject)=>{
            try{
                let data=getDb().collection(collectionName).find(filter).toArray();
                console.log(`data found for${filter}`);
                resolve(data);
            }
            catch(err){
                console.log(err);
                reject(err);
            }
        })
    }

}




module.exports=Comments;