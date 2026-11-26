import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Blog.css';

const fallbackBlogPosts = [
  {
    _id: '1',
    title: 'Managing Client-Side State with localStorage in React',
    excerpt:
      'Notes on keeping React component state synchronized with browser localStorage for tools like the Kanban Board and Expense Tracker.',
    createdAt: '2026-04-12T00:00:00.000Z',
    readTime: '4 min read',
    category: 'React.js',
  },
  {
    _id: '2',
    title: 'Writing Predictable Joins and Constraints in PostgreSQL',
    excerpt:
      'Practical patterns for primary keys, foreign keys, and multi-table queries when modeling structured application data in SQL.',
    createdAt: '2026-06-18T00:00:00.000Z',
    readTime: '5 min read',
    category: 'SQL',
  },
  {
    _id: '3',
    title: 'Building FreeClass and Team Data Dashboards',
    excerpt:
      'Observations from organizing timetable lookups in FreeClass and collaborating across departments on the Food Toxicants Dashboard.',
    createdAt: '2026-09-05T00:00:00.000Z',
    readTime: '4 min read',
    category: 'Projects',
  },
];

function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPosts(fallbackBlogPosts);
    setIsLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="blog" className="section blog">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="section-label">05 / Notes</span>
          <h2 className="section-title">Technical Notes</h2>
          <p className="section-subtitle">
            Short write-ups on React.js state patterns, SQL/PostgreSQL queries, and project architecture.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="blog-loading">
            <p>Loading notes...</p>
          </div>
        ) : (
          <div className="blog-list">
            {posts.map((post) => (
              <article key={post._id} className="blog-row">
                <div className="blog-row-meta">
                  <span className="blog-date">{formatDate(post.createdAt)}</span>
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>

                <div className="blog-row-main">
                  <h3 className="blog-title">
                    <Link to={`/blog/${post._id}`} className="blog-title-link">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                </div>

                <div className="blog-row-action">
                  <Link to={`/blog/${post._id}`} className="blog-read-more">
                    Read →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Blog;
