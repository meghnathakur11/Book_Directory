const express = require('express');
const app = express();
const path = require('path');

app.use(express.json()); 
app.use(express.static('public'));
const books = {}; 
let nextId = 1; 
// GET all books
app.get('/books', (req, res) => {
    res.json(Object.values(books));
});

// POST a new book
app.post('/books', (req, res) => {
    const id = nextId++;
    const { title, author, year } = req.body;
    books[id] = { id, title, author, year };
    res.status(201).json(books[id]);
});

// Update a book
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (!books[bookId]) {
        return res.status(404).send('Book not found.');
    }
    const { title, author, year } = req.body;
    books[bookId] = { id: bookId, title, author, year };
    res.json(books[bookId]);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    if (!books[bookId]) {
        return res.status(404).send('Book not found.');
    }
    delete books[bookId];
    res.status(204).send(); 
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
