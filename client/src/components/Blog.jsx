/*
  =============================================
  📚 LESSON: Blog Component
  =============================================
  
  This component displays blog post cards in a grid.
  
  KEY CONCEPTS YOU'LL LEARN:
  1. DATA ARRAYS: Storing structured data in JavaScript arrays
  2. .map() METHOD: Transforming data into React elements
  3. DYNAMIC STYLING: Passing different styles per card
  4. COMPONENT REUSABILITY: One card template, multiple posts
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Blog.css';

/*
  📚 LESSON: Static Fallback Data
  
  If our backend API is not running, we still want the website to work.
  We keep these mock posts as a "fallback" (backup) so the visitor 
  always sees something, even if the database is offline!
*/
const fallbackBlogPosts = [
  {
    _id: '1',
    title: 'My Journey into Web Development',
    excerpt:
      'How I went from knowing nothing about coding to building full-stack applications. The ups, downs, and everything I learned along the way.',
    createdAt: '2025-01-15T00:00:00.000Z',
    readTime: '5 min read',
    category: 'Journey',
    categoryColor: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
  },
  {
    _id: '2',
    title: 'Understanding the MERN Stack',
    excerpt:
      'A beginner-friendly breakdown of MongoDB, Express, React, and Node.js — what each one does and how they work together.',
    createdAt: '2025-02-20T00:00:00.000Z',
    readTime: '8 min read',
    category: 'Tutorial',
    categoryColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
  },
  {
    _id: '3',
    title: 'Building My First Full-Stack App',
    excerpt:
      'Lessons learned from building my first complete MERN application from scratch — including all the mistakes I made and how I fixed them.',
    createdAt: '2025-03-10T00:00:00.000Z',
    readTime: '6 min read',
    category: 'Project',
    categoryColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

function Blog() {
  // ========================================================================
  // STATE MANAGEMENT for API Calls
  // ========================================================================
  // 1. posts: Stores the array of blogs fetched from MongoDB
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPosts(fallbackBlogPosts);
    setIsLoading(false);
  }, []);

  // Helper to format date strings nicely
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="blog" className="section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">My Blog</span>
          </h2>
          <p className="section-subtitle">
            Sharing my learnings, tutorials, and experiences as I grow as a
            developer
          </p>
        </motion.div>

        {/* 
          📚 LESSON: Conditional Rendering
          
          We render different HTML elements based on state variables:
          - If isLoading is true, show a Loading spinner
          - If loading is done, render the grid of posts
        */}
        {isLoading ? (
          <div className="blog-loading">
            <div className="spinner"></div>
            <p>Fetching posts from database...</p>
          </div>
        ) : (
          <motion.div
            className="blog-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {posts.map((post) => (
              <motion.article
                key={post._id}
                className="blog-card"
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                {/* Colored strip at top — each card gets a different gradient */}
                <div
                  className="blog-card-strip"
                  style={{ background: post.gradient || 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
                />

                <div className="blog-card-content">
                  {/* Category badge — dynamically colored */}
                  <span
                    className="blog-category"
                    style={{
                      backgroundColor: `${post.categoryColor || '#7c3aed'}20`,
                      color: post.categoryColor || '#7c3aed',
                    }}
                  >
                    {post.category}
                  </span>

                  <h3 className="blog-title">{post.title}</h3>

                  <p className="blog-excerpt">{post.excerpt}</p>

                  {/* Bottom row: meta info + read more */}
                  <div className="blog-meta">
                    <span>
                      {formatDate(post.createdAt)} · {post.readTime}
                    </span>
                    <Link to={`/blog/${post._id}`} className="blog-read-more">
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Blog;
