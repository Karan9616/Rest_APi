const {MongoClient} = require('mongodb');
let uri='mongodb+srv://Pushkaran:alWZ6qfl2z177xb5@cluster0.3zx7yev.mongodb.net/?retryWrites=true&w=majority'

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