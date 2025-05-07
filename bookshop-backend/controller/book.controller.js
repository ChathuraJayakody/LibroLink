const db = require('../models');
const Book = db.book;

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving book', error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({ order: [['title', 'ASC']] });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving books', error: err.message });
  }
};