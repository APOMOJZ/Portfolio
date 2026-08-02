/*
  =============================================
  📚 LESSON: db.js — Connecting Node.js to MongoDB
  =============================================
  
  Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
  It helps us:
  1. Connect to our database
  2. Write schemas to structure our data (like a blueprint)
  3. Query the database easily using JavaScript methods (like .find(), .save())
  
  KEY CONCEPTS:
  - async/await: Database calls are asynchronous (they take time). async/await tells 
    JavaScript to wait for the database response before moving to the next line of code.
  - try/catch: A way to handle errors. If the database connection fails (e.g. wrong password or internet down),
    the catch block will handle the error gracefully without crashing our entire server.
*/

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // process.env retrieves variables from our secret .env file.
    // MONGO_URI contains the URL to our MongoDB Atlas cloud database.
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🟢 MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔴 MONGODB CONNECTION ERROR: ${error.message}`);
    
    // Exit the Node.js process with a failure code (1) if database connection fails
    process.exit(1);
  }
};

export default connectDB;
