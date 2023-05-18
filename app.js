const express = require('express');
const app = express();
const { ObjectId }=require('mongodb');
const { connectToDb, getDb } = require('./db');


app.use(express.json());


//db connection

let db


connectToDb((err) => {
    if (!err) {
        app.listen(8000, () => {
            console.log("APP is listening");
        })
        db = getDb() //db is an object that is called to perform functions like fetch,save,update data
    }
})


app.get('/books', (req, res) => {

    let books = []
    const page=req.query.page || 0
    const bookPerPage=2

    db.collection('books')
        .find()//usually find method returns a set of(20) fields in a document , but in here 
        //it is a cursor that points to fileds , so we use toArray forEach ( to iterate through batch of documents)
        .sort({ author: 1 })
        .skip(page * bookPerPage) //Pagination
        .limit(bookPerPage)
        .forEach(book => books.push(book))//find returns a cursor and here we return  cursor method
        .then(() => {
            res.status(200).json(books)
        })
        .catch((err) => {
            res.status(500).json({ err: 'could not fetch the data' })
        })

})

//id is a route parameter,so it is used with ":"
//req.params.id to access the request parameter
app.get('/books/:id',(req,res)=>{
    const id = req.params.id;
    db.collection('books')
    .findOne({_id:new ObjectId(id)})
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json({error:'couldnot fetch data'})
    })

})


app.post('/books',(req,res)=>{
    const book = req.body

    db.collection('books')
        .insertOne(book)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            res.status(500).json({err:'could not create'})
        })
})


app.delete('/books/:id',(req,res)=>{
if(ObjectId.isValid(req.params.id)){
    const id = req.params.id;
    db.collection('books')
    .deleteOne({_id:new ObjectId(id)})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({err:'couldnot find the document'})
    })
}
else {
    res.status(400).json({err:'invalid id'})
}

})

app.patch('/books/:id',(req,res)=>{
    const updates=req.body
    if(ObjectId.isValid(req.params.id)){
        const id = req.params.id;
        db.collection('books')
        .updateOne({_id:new ObjectId(id)},{$set:updates})
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({err:'couldnot find the document'})
        })
    }
    else {
        res.status(500).json({err:'invalid id'})
    }
    

})
