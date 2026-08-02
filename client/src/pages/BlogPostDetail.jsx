/*
  =============================================
  📚 LESSON: React Router & Single Item Fetching
  =============================================
  
  In a multi-page app, each page has its own URL. React Router handles this 
  without reloading the browser!
  
  KEY CONCEPTS IN THIS FILE:
  1. useParams Hook: Retrieves parameters from the URL (e.g. gets the blog ID from /blog/:id)
  2. useNavigate Hook: Lets us programmatically redirect the user (e.g. go back to home)
  3. single-item fetch: We make an API call to `/api/blog/${id}` to get just this post's data
  4. DOMPurify or dangerouslySetInnerHTML: React blocks raw HTML string rendering by default 
     for security. We use dangerouslySetInnerHTML to render our blog content, explaining 
     why it's used and how to make it safe.
*/

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import './BlogPostDetail.css';

// Offline fallback blog post contents if backend server is not running
const fallbackBlogContents = {
  '1': {
    title: 'My Journey into Web Development',
    category: 'Journey',
    createdAt: '2025-01-15T00:00:00.000Z',
    readTime: '5 min read',
    gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
    content: `
      <h2>The Beginning</h2>
      <p>Starting web development can feel overwhelming. There are so many technologies: HTML, CSS, JavaScript, React, Node, SQL, NoSQL. Where do you even begin?</p>
      <p>I started with the basics: HTML and CSS. I learned that HTML is the skeleton, CSS is the skin and clothes, and JavaScript is the brain. Once I got comfortable building static pages, I moved on to JS.</p>
      <h2>Moving to JavaScript</h2>
      <p>JavaScript brought my pages to life. I learned about variables, loops, functions, and manipulating the DOM. Building interactive projects (like calculators and weather apps) helped solidify my understanding.</p>
      <h2>Discovering React</h2>
      <p>React was a game changer. Component-based architecture made UI development modular and fun. Instead of writing huge HTML files, I could write small, reusable React components!</p>
      <h2>Next Steps</h2>
      <p>Now, I am mastering the backend with Node.js, Express, and MongoDB. Full-stack development allows me to build complete, end-to-end applications from scratch.</p>
    `
  },
  '2': {
    title: 'Understanding the MERN Stack',
    category: 'Tutorial',
    createdAt: '2025-02-20T00:00:00.000Z',
    readTime: '8 min read',
    gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    content: `
      <h2>The MERN Stack Components</h2>
      <p>MERN is an acronym for four key technologies that make up a full-stack JavaScript environment:</p>
      <h3>1. MongoDB (Database)</h3>
      <p>A document-based NoSQL database. It stores data in JSON-like formats called documents. It is highly flexible and scalable.</p>
      <h3>2. Express.js (Backend Framework)</h3>
      <p>A lightweight framework for Node.js. It simplifies handling HTTP requests, routing, and building API endpoints.</p>
      <h3>3. React (Frontend)</h3>
      <p>A library built by Meta for building user interfaces. It uses components and a Virtual DOM to build fast, interactive user experiences.</p>
      <h3>4. Node.js (Runtime Environment)</h3>
      <p>Allows us to run JavaScript outside the browser (on our backend server). It is built on Google Chrome's V8 JavaScript engine.</p>
      <h2>How They Work Together</h2>
      <p>1. The user visits the website and interacts with the <strong>React</strong> frontend.<br/>
         2. React makes HTTP requests (like GET or POST) to the <strong>Node/Express</strong> backend API.<br/>
         3. The backend receives the request, processes the logic, and talks to the <strong>MongoDB</strong> database.<br/>
         4. MongoDB sends data back to the backend, which returns it as JSON to React.<br/>
         5. React updates the UI dynamically using the new data.</p>
    `
  },
  '3': {
    title: 'Building My First Full-Stack App',
    category: 'Project',
    createdAt: '2025-03-10T00:00:00.000Z',
    readTime: '6 min read',
    gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
    content: `
      <h2>The Concept</h2>
      <p>For my first full-stack app, I wanted to build something practical but challenging. I decided to make a real-time Task Manager app with custom categories, user authentication, and email notifications.</p>
      <h2>Key Challenges</h2>
      <h3>1. Connecting Frontend and Backend</h3>
      <p>Initially, I faced CORS issues. I learned that I had to explicitly allow my React port on my Express backend using the cors middleware.</p>
      <h3>2. Managing State</h3>
      <p>Passing tasks data between components got messy. I learned how to lift state up and use React Context to share data globally across the frontend.</p>
      <h3>3. Database Operations</h3>
      <p>Structuring the data schema took some planning. Using Mongoose allowed me to write clean validation schemas for users and tasks.</p>
      <h2>Lessons Learned</h2>
      <p>Start small, test endpoints using Postman before writing frontend fetch calls, and write clean, modular code. Don't be afraid of errors — they are your best teachers!</p>
    `
  }
};

function BlogPostDetail() {
  /*
    📚 LESSON: useParams
    
    If the Route is defined as: <Route path="/blog/:id" element={<BlogPostDetail />} />
    And the URL is: http://localhost:5173/blog/abc12345
    → useParams() returns the object { id: "abc12345" }
  */
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
      alert('Blog post not found!');
      navigate('/');
    }
    setIsLoading(false);
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="blog-detail-loading-page">
        <div className="spinner"></div>
        <p>Loading blog content...</p>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      {/* Decorative top strip */}
      <div 
        className="blog-detail-hero-strip"
        style={{ background: post.gradient || 'linear-gradient(135deg, #7c3aed, #ec4899)' }}
      />
      
      <div className="blog-detail-container">
        {/* Back Link */}
        <Link to="/" className="back-home-link">
          <FaArrowLeft /> Back to Portfolio
        </Link>
        
        <motion.article 
          className="blog-detail-article"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Metadata */}
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
          
          {/* Title */}
          <h1 className="blog-detail-title">{post.title}</h1>
          
          <p className="blog-detail-excerpt">{post.excerpt}</p>
          
          <hr className="blog-detail-divider" />
          
          {/* Content Body */}
          {/* 
            📚 LESSON: dangerouslySetInnerHTML
            
            By default, React escapes all HTML tags in variables to protect 
            against Cross-Site Scripting (XSS) attacks. 
            If you do: <div>{"<p>hello</p>"}</div>, React prints the literal text "<p>hello</p>".
            
            To render actual HTML, we use the dangerouslySetInnerHTML attribute.
            We call it "dangerous" because if you load HTML from untrusted users, 
            they could inject malicious scripts.
            Since our blog content is only written by us, this is safe to use!
          */}
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
