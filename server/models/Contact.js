/*
  =============================================
  📚 LESSON: Mongoose Schemas & Models (Contact)
  =============================================
  
  Unlike traditional SQL databases that require strict table structures,
  MongoDB is a "NoSQL" document database — it stores data in JSON-like documents.
  
  To keep our data consistent, we use Mongoose Schemas.
  A SCHEMA is a blueprint that defines what fields a document can have,
  what data types they are, and any validations (like "required: true").
  
  A MODEL is a constructor compiled from the schema. It lets us actually 
  query, save, delete, and update documents in the MongoDB database.
*/

import mongoose from 'mongoose';

// Define the Schema (blueprint) for a contact message
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'], // Validation error message if empty
    trim: true // Automatically removes leading/trailing spaces
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    trim: true,
    lowercase: true // Converts email to lowercase before saving
  },
  subject: {
    type: String,
    required: [true, 'Please enter a subject'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please enter a message']
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the current date and time
  }
});

// Compile the schema into a Model.
// Mongoose will automatically look for the plural collection name in MongoDB (i.e. "contacts").
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
