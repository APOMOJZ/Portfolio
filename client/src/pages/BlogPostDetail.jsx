import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import './BlogPostDetail.css';

const fallbackBlogContents = {
  '1': {
    title: 'Managing Client-Side State with localStorage in React',
    category: 'React.js',
    createdAt: '2026-04-12T00:00:00.000Z',
    readTime: '4 min read',
    excerpt:
      'Notes on keeping React component state synchronized with browser localStorage for tools like the Kanban Board and Expense Tracker.',
    content: `
      <h2>Lazy Initialization with useState</h2>
      <p>When building client-side utilities such as a Kanban board or expense ledger, reading from <code>localStorage</code> inside a lazy initializer function avoids parsing JSON on every re-render.</p>
      <p>Passing a function to <code>useState(() =&gt; ...)</code> runs the read once during the initial mount and falls back cleanly to default sample data when no saved state exists.</p>
      <h2>Syncing Updates with useEffect</h2>
      <p>Pairing that state with a targeted <code>useEffect</code> hook ensures every task move, edit, or new transaction is serialized back to storage immediately after the state updates.</p>
      <h2>Resetting Predictably</h2>
      <p>Providing an explicit reset action restores the default array and overwrites the stored key, keeping the interface predictable during testing and demos.</p>
    `,
  },
  '2': {
    title: 'Writing Predictable Joins and Constraints in PostgreSQL',
    category: 'SQL',
    createdAt: '2026-06-18T00:00:00.000Z',
    readTime: '5 min read',
    excerpt:
      'Practical patterns for primary keys, foreign keys, and multi-table queries when modeling structured application data in SQL.',
    content: `
      <h2>Constraints at the Schema Layer</h2>
      <p>Defining explicit <code>NOT NULL</code>, <code>CHECK</code>, and <code>FOREIGN KEY</code> constraints in PostgreSQL prevents invalid rows from entering tables regardless of which client writes to them.</p>
      <h2>Choosing the Right Join</h2>
      <p>Using <code>INNER JOIN</code> when matching required parent records and <code>LEFT JOIN</code> when optional metadata may be missing keeps query results explicit and easier to debug.</p>
      <h2>Aggregating with GROUP BY</h2>
      <p>Summarizing category totals or time-window counts directly in SQL reduces redundant filtering logic on the client and keeps report queries concise.</p>
    `,
  },
  '3': {
    title: 'Building FreeClass and Team Data Dashboards',
    category: 'Projects',
    createdAt: '2026-09-05T00:00:00.000Z',
    readTime: '4 min read',
    excerpt:
      'Observations from organizing timetable lookups in FreeClass and collaborating across departments on the Food Toxicants Dashboard.',
    content: `
      <h2>Structuring Data for Fast Lookup</h2>
      <p>In FreeClass, students need to know which rooms are open right now without scanning full timetable tables. Normalizing schedules by building, day, and time slot makes availability checks straightforward.</p>
      <h2>Interdepartmental Collaboration</h2>
      <p>Working on the Food Toxicants Dashboard with both Computer Science and Biotech teammates meant translating domain datasets into clean filter controls and readable summary views.</p>
      <h2>Keeping Interfaces Scannable</h2>
      <p>Removing decorative clutter and keeping labels, filters, and data rows aligned makes technical dashboards easier to verify and maintain.</p>
    `,
  },
};

function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fallbackPost = fallbackBlogContents[id];
    if (fallbackPost) {
      setPost(fallbackPost);
    } else {
      alert('Note not found.');
      navigate('/');
    }
    setIsLoading(false);
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="blog-detail-loading-page">
        <p>Loading note...</p>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-container">
        <Link to="/" className="back-home-link">
          <FaArrowLeft />
          <span>Back to Portfolio</span>
        </Link>

        <motion.article
          className="blog-detail-article"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="blog-detail-meta">
            <span className="blog-detail-category">
              <FaTag /> {post.category}
            </span>
            <span className="blog-detail-date">
              <FaCalendarAlt /> {formatDate(post.createdAt)}
            </span>
            <span className="blog-detail-readtime">
              <FaClock /> {post.readTime}
            </span>
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>

          <p className="blog-detail-excerpt">{post.excerpt}</p>

          <hr className="blog-detail-divider" />

          <div
            className="blog-detail-content-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </div>
    </div>
  );
}

export default BlogPostDetail;
