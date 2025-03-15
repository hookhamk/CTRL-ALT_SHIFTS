import express from 'express';
import dotenv from 'dotenv';
import db from './config/connection';  // Importing your connection file

dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
db().then(() => {
  console.log('Successfully connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);  // Exit if the connection fails
});

// Define routes
app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});