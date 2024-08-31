const express = require('express');
const mongoose = require('mongoose');
const { Book } = require("./bookSchema")
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/books');

app.post('/books/create', (req, res) => {
    const book = new Book(req.body);
    book.save();
    res.send(book);
})

app.get('/books/get', async (req, res) => {
    const bookData = await Book.find();
    // console.log("books data: ",bookData);
    res.send(bookData);
})

app.get('/booksById/:id', async (req, res) => {
    const bookById = await Book.findById(req.params.id);
    res.send(bookById);
})

app.patch('/books/Update/:id', async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    updateBook.save();
    res.send(updateBook);
})

app.delete('/books/delete/:id',async(req,res)=>{
    const indexDel=await Book.findByIdAndDelete(req.params.id);
    indexDel.save();
    res.send(indexDel);
})

const port = 3000;
app.listen(port, () => {
    console.log("server listening on port: ", port);
})