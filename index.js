import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api', bookRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

