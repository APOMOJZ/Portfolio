/*
  =============================================
  📚 LESSON: Database Seeding (seed.js)
  =============================================
  
  "Seeding" a database means filling it with initial data so you 
  don't start with a completely empty screen.
  
  This script:
  1. Connects to MongoDB
  2. Deletes any old blog posts (so we don't duplicate them)
  3. Inserts our default posts
  4. Disconnects from the database
  
  You can run this script once in your terminal with: `node seed.js`
*/

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import BlogPost from './models/BlogPost.js';

// Load environment variables
dotenv.config();

const sampleBlogs = [
  {
    title: 'My Journey into Web Development',
    excerpt: 'How I went from knowing nothing about coding to building full-stack applications. The ups, downs, and everything I learned along the way.',
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
    `,
    category: 'Journey',
    categoryColor: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
    readTime: '5 min read'
  },
  {
    title: 'Understanding the MERN Stack',
    excerpt: 'A beginner-friendly breakdown of MongoDB, Express, React, and Node.js — what each one does and how they work together.',
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
    `,
    category: 'Tutorial',
    categoryColor: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    readTime: '8 min read'
  },
  {
    title: 'Building My First Full-Stack App',
    excerpt: 'Lessons learned from building my first complete MERN application from scratch — including all the mistakes I made and how I fixed them.',
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
    `,
    category: 'Project',
    categoryColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
    readTime: '6 min read'
  }
];

const seedDatabase = async () => {
  try {
    // 1. Connect to DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 Seed script connected to MongoDB...');

    // 2. Clear old data
    await BlogPost.deleteMany({});
    console.log('🗑️ Deleted old blog posts...');

    // 3. Insert new data
    await BlogPost.insertMany(sampleBlogs);
    console.log('🌱 Database seeded with initial blog posts successfully!');

    // 4. Disconnect
    mongoose.connection.close();
    console.log('🔌 Disconnected from database.');
    process.exit(0);
  } catch (error) {
    console.error(`🔴 Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
