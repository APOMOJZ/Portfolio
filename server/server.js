/*
  =============================================
  📚 LESSON: server.js — The Entry Point of the Server
  =============================================
  
  In the MERN stack, Node.js + Express.js act as our backend (server).
  The server is responsible for:
  1. Listening for HTTP requests from the browser (React frontend)
  2. Running server-side logic (e.g., sending emails, processing data)
  3. Communicating with our database (MongoDB)
  4. Sending back JSON responses to the frontend
  
  KEY CONCEPTS IN THIS FILE:
  - Express: A fast web framework for Node.js
  - Middleware: Functions that run during the request-response cycle (like CORS, JSON parser)
  - CORS (Cross-Origin Resource Sharing): A security mechanism. By default, browsers block 
    websites on one port (e.g., 5173 for React) from making requests to another port (e.g., 5000 for Express).
    CORS middleware tells the server to allow requests from our React app.
  - Dotenv: Loads secret configurations (like database credentials, email passwords) from a .env file.
*/

// ===== IMPORTS =====
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';
import blogRoutes from './routes/blog.js';

// Load environment variables from our secret .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Set the port we want the server to listen on.
// If a PORT is defined in our .env file, we use that; otherwise, we default to 5000.
const PORT = process.env.PORT || 5000;

// Connect to our MongoDB database
connectDB();

// ===== MIDDLEWARE =====

// 1. CORS Middleware
// This permits our React frontend (running on http://localhost:5173) to communicate with this server.
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// 2. JSON Body Parser Middleware
// When the frontend sends data to the server (like form entries), it sends it in JSON format.
// This middleware parses that JSON and makes it available as `req.body` in our routes.
app.use(express.json());

// ===== ROUTES =====
// We link our API routes to specific endpoints (URLs).
// This is like mapping traffic: all requests starting with '/api/contact' go to contactRoutes.
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);

// Simple base route to check if the server is healthy
app.get('/', (req, res) => {
  res.send('🚀 Portfolio API is running successfully!');
});

// ===== START SERVER =====
// Tell Express to start listening for incoming requests on the specified port.
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🟢 SERVER IS RUNNING ON PORT: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
