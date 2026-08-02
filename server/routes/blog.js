/*
  =============================================
  📚 LESSON: Express Routing (Blog Route)
  =============================================
  
  This file handles all requests that go to '/api/blog'.
  It implements CRUD operations:
  - CREATE (POST): Add a new blog post to the database
  - READ ALL (GET): Fetch all blog posts from the database
  - READ ONE (GET): Fetch a single blog post by its unique ID (for details page)
  
  KEY CONCEPTS:
  - req.params: Used to get variables from the URL path (e.g. /api/blog/:id)
  - Mongoose Queries:
    - BlogPost.find(): Retrieves all documents, sorted by newest first (.sort({ createdAt: -1 }))
    - BlogPost.findById(): Retrieves a single document by its id
    - BlogPost.create(): Saves a new document
*/

import express from 'express';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// @route   GET api/blog
// @desc    Get all blog posts sorted by date (newest first)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Find all blog posts and sort them by createdAt date in descending order (-1)
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error(`🔴 GET BLOGS ERROR: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog posts'
    });
  }
});

// @route   GET api/blog/:id
// @desc    Get a single blog post by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Find post by ID passed in URL params (req.params.id)
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error(`🔴 GET BLOG BY ID ERROR: ${error.message}`);
    // If the ID is invalid (e.g. wrong format), Mongoose throws a CastError
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found (Invalid ID format)'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve the blog post'
    });
  }
});

// @route   POST api/blog
// @desc    Create a new blog post
// @access  Public (In a production app, this would be protected by JWT auth!)
router.post('/', async (req, res) => {
  const { title, excerpt, content, category, categoryColor, gradient, readTime } = req.body;

  // Basic validation
  if (!title || !excerpt || !content || !category || !readTime) {
    return res.status(400).json({
      success: false,
      message: 'Please provide title, excerpt, content, category, and readTime'
    });
  }

  try {
    const newPost = await BlogPost.create({
      title,
      excerpt,
      content,
      category,
      categoryColor,
      gradient,
      readTime
    });

    return res.status(201).json({
      success: true,
      message: 'Blog post created successfully!',
      data: newPost
    });
  } catch (error) {
    console.error(`🔴 CREATE BLOG ERROR: ${error.message}`);
    // Handle duplicate title error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this title already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

export default router;
