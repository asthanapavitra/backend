import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Use the /api prefix for all routes
app.use('/api', bookRoutes);

// Default route to handle '/'
app.get('/', (req, res) => {
  res.send('Welcome to My Bookshelf API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
