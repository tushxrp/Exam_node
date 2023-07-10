const express = require('express');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sunbeam',
  database: 'tushar',
});


db.connect();


app.get('/books/:author', (req, res) => {
  const author = req.params.author;
  const query = `SELECT * from Book_Tb WHERE author = '${author}'`;
  db.query(query, (err, result) => {
    res.json(result);
  });
});


app.post('/books', (req, res) => {
  const newBook = req.body;
  const query = `INSERT INTO Book_Tb (b_name, author, book_type, price, publishedDate, language) 
  VALUES ('${newBook.b_name}', '${newBook.author}', '${newBook.book_type}', ${newBook.price}, '${newBook.publishedDate}', '${newBook.language}')`;

  db.query(query, (err, result) => {
    res.json({ message: 'Book added successfully' });
  });
});


app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { price, language } = req.body;

  const query = `UPDATE Book_Tb SET price = ${price}, 
  language = '${language}' WHERE id = ${id}`;

  db.query(query, (err, result) => {
    res.json({ message: 'Book updated successfully' });
  });
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
