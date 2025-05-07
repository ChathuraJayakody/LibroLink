const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', async (req, res) => {
  const { title, author, price, stock, description, coverImage } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO books (title, author, price, stock, description, coverImage) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, price, stock, description, coverImage]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { title, author, price, stock, description, coverImage } = req.body;
  try {
    await db.execute(
      'UPDATE books SET title=?, author=?, price=?, stock=?, description=?, coverImage=? WHERE id=?',
      [title, author, price, stock, description, coverImage, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM books WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
