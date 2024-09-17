import express from 'express';
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/BookController.js';
import fetchBookCover from '../utils/fetchBookCover.js';

const router = express.Router();

router.get("/",(req,res)=>{
  console.log("Server running");
})
// GET all books
router.get('/books', getAllBooks);

// GET a single book by ID
router.get('/books/:id', getBookById);

// POST route for adding a book
router.post('/books', async (req, res) => {
  const { title, author, rating, publishDate, summary, notes, description } = req.body;
  console.log(req.body);
  console.log(title);
  try {
    // Fetch the book cover using the utility function
    const coverImageUrl = await fetchBookCover(title);
    console.log(coverImageUrl);
    // Add the book to the database with the description field
    const newBook = await addBook({
      title,
      author,
      rating,
      publish_date: publishDate, // Consistent naming with the database
      summary,
      notes,
      cover_image_url: coverImageUrl,
      description,  // Now including description
    });

    // Send success response
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// PUT route for updating a book
router.put('/books/:id', updateBook);

// DELETE route for deleting a book
router.delete('/books/:id', deleteBook);

// Test route
router.get('/test', (req, res) => {
  res.send('Server is up and running');
});

export default router;

