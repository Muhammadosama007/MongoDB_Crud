const express = require('express');
const mongoose = require('mongoose');
const { Book } = require("./bookSchema")
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/books');

app.post('/books/create', (req, res) => {
    const book = new Book(req.body);
    if (!book) {
        res.status(404).send({
            message: "Book Not Created"
        })
    }
    else {
        book.save();
        res.send(book);
    }

})

app.get('/books/get', async (req, res) => {
    const bookData = await Book.find();
    if (!bookData) {
        res.status(404).send({
            message: "Books Not found!!!"
        })
    }
    else {
        // console.log("books data: ",bookData);
        res.send(bookData);
    }
})

app.get('/booksByName', async (req, res) => {
    const bookByName = await Book.findOne({ title: req.query.title })
    if (!bookByName) {
        res.status(404).send({
            message: "Can't get book by Title!!!"
        })
    }
    else {
        res.send(bookByName)
    }
})

app.get('/booksByAuthor', async (req, res) => {
    const booByAuthor = await Book.findOne({ author: req.query.author })
    if (!booByAuthor) {
        res.status(404).send({
            message: "Can't get book by Author!!!"
        })
    }
    else {
        res.send(booByAuthor);
    }
})

app.get('/booksById/:id', async (req, res) => {
    const bookById = await Book.findById(req.params.id);
    if (!bookById) {
        res.status(404).send({
            message: "Can't get book by id!!!"
        })
    }
    else {
        res.send(bookById);
    }
})

app.patch('/books/Update/:id', async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!updateBook) {
        res.status(404).send({
            message: "Can't Update book!!!"
        })
    }
    else {
        updateBook.save();
        res.send(updateBook);
    }
})

app.delete('/books/delete/:id', async (req, res) => {
    const indexDel = await Book.findByIdAndDelete(req.params.id);
    if (!indexDel) {
        res.status(404).send({
            message: "Can't Delete book!!!"
        })
    }
    else {
        indexDel.save();
        res.send(indexDel);
    }
})

const port = 3000;
app.listen(port, () => {
    console.log("server listening on port: ", port);
})