//this is the code to connect to our database and we use it so we can connect to our database
const {MongoClient}=require('mongodb');

//connect to the url
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);

//our database name
const dbName='facebook';


let _db;//we make this so that after connectio we can directly get this we don't need to call it again and again 
//and do a new connection to just get the db name

const mongoConnect=()=>{
    return client.connect()
    .then((client)=>{
        console.log('connecting to the database');
        _db=client.db(dbName);
    })
    .catch((err)=>{
        console.log(err);
    });
}


const getDb=()=>{
    if(_db){
        return _db;
    }
    return null;
}


//as we will acquire this file where we need to connect the database bro so we export them.
module.exports.mongoConnect=mongoConnect;
module.exports.getDb=getDb;