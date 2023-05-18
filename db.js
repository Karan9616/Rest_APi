const {MongoClient} = require('mongodb');
let uri=''//enter ur URL here

let dbConnection

module.exports ={
    connectToDb:(cb) =>{ //cb is a callback function and isused as an argument
        MongoClient.connect( uri)//this is use to connect to the databse
        .then((client)=>{
            dbConnection = client.db('')
            return cb();
        })
        .catch(err=>{
            console.log(err);
            return cb(err)
        })
        
    },
    getDb:() =>dbConnection //used to return the database
}
