import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';

export const getAllBooks = async (req, res) => {
  const { search = '', sort = 'title' } = req.query;

  try {
    // SQL query to filter by title or author
    const query = `
      SELECT * FROM books
      WHERE LOWER(title) LIKE $1 OR LOWER(author) LIKE $1
      ORDER BY ${sort === 'Newest' ? 'publish_date DESC' : sort === 'Rating' ? 'rating DESC' : 'title ASC'}
    `;

    const result = await pool.query(query, [`%${search.toLowerCase()}%`]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};


export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};
export const addBook = async (bookData) => {
  const { title, author, rating, publish_date, summary, notes, cover_image_url, description } = bookData;

  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, rating, publish_date, summary, notes, cover_image_url, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, author, rating, publish_date, summary, notes, cover_image_url, description]
    );
    return result.rows[0]; // Return the newly created book
  } catch (error) {
    throw new Error('Failed to add book: ' + error.message);
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, rating, publish_date, summary, notes, cover_image_url, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, rating = $3, publish_date = $4, summary = $5, notes = $6, cover_image_url = $7, description = $8 WHERE id = $9 RETURNING *',
      [title, author, rating, publish_date, summary, notes, cover_image_url, description, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

