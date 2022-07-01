const router = require("express").Router();
const books = require("./book_list");

let booksDirectory = books;

router.get("/books" , (req , res) => {
    res.send(booksDirectory);
});

router.get("/books/:id" , (req , res) => {
    const {id} = req.params;

    const book = booksDirectory.find(b => b.isbn === id);
    if(!book) return res.status(404).send("book does not exist");

    res.send(book);
});

router.post("/books" , (req , res) => {
    const {
        title,
        isbn,
        pageCount,
        authors,
        categories
    } = req.body;

    const bookExist = booksDirectory.find(b => b.isbn === isbn);
    if(bookExist) return res.status(404).send("Book already exist");

    const book = {
        title,
        authors,
        isbn,
        pageCount,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
});

router.put("/books/:id" , (req , res) => {
    const {id} = req.params;

    const {
        title,
        authors,
        pageCount,
        categories
    } = req.body;

    const book = booksDirectory.find(b => b.isbn === id);
    if(!book) return res.send("book does not found");

    const updateField = (val , prev) => !val ? prev : val;

    const updatedBook = {
        ...book,  //providing every single parameter of book
        title: updateField(title , book.title),
        authors: updateField(authors , book.authors),
        categories: updateField(categories , book.categoris),
        pageCount: updateField(pageCount , book.pageCount)
    };

    const bookIndex = booksDirectory.find(b => b.isbn === id);
    booksDirectory.splice(bookIndex , 1 ,updatedBook);

    res.send(updatedBook);
});

router.delete("/books/:id" , (req , res) => {
    const {id} = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if(!book) return res.status(404).send("Book does not exist");

    booksDirectory = booksDirectory.filter(b=>b.isbn !== id);

    res.send("success");
});

module.exports = router;