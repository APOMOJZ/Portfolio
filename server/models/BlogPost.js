/*
  =============================================
  📚 LESSON: Mongoose Schemas & Models (BlogPost)
  =============================================
  
  This schema outlines our Blog Posts structure.
  We want to store blogs so that we can show them on the portfolio website!
  Later we can use MongoDB Atlas (the GUI website) to add posts,
  or create a hidden admin page, or add them via a script.
*/

import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter a blog title'],
    trim: true,
    unique: true // No two blog posts can have the exact same title
  },
  excerpt: {
    type: String,
    required: [true, 'Please enter a short description/excerpt'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please enter the main body content']
  },
  category: {
    type: String,
    required: [true, 'Please enter a category (e.g. Tutorial, Journey)'],
    trim: true
  },
  categoryColor: {
    type: String,
    default: '#7c3aed' // Hex color for the category tag badge
  },
  gradient: {
    type: String,
    default: 'linear-gradient(135deg, #7c3aed, #ec4899)' // Gradient for the top strip of the card
  },
  readTime: {
    type: String,
    required: [true, 'Please enter the estimated read time (e.g. 5 min read)'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
