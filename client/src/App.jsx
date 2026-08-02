/*
  =============================================
  📚 LESSON: App.jsx — The Main Component
  =============================================
  
  This is the ROOT COMPONENT of our React app.
  Think of it like the "main page" that holds all other components.
  
  In React, everything is built from COMPONENTS — small, reusable 
  pieces of UI. This App component COMPOSES all our section components
  together to form the complete website.
  
  KEY CONCEPTS:
  1. IMPORTING: We bring in other components using 'import'
  2. JSX: The HTML-like syntax inside the return statement
  3. COMPONENT COMPOSITION: Placing components inside other components
  4. FRAGMENTS: <> </> lets us return multiple elements without adding extra divs
*/

// ===== IMPORTS =====
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import our section components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import our sub-pages
import BlogPostDetail from './pages/BlogPostDetail';
import KanbanProject from './pages/KanbanProject';
import ExpenseProject from './pages/ExpenseProject';

// Import the App-specific styles
import './App.css';

/*
  📚 LESSON: React Router configuration
  
  We wrap our app in <Router> (BrowserRouter).
  Inside <Routes>, we define individual <Route> components:
  - path="/": Renders the complete one-page portfolio site.
  - path="/blog/:id": Renders the detailed blog page for the selected post.
  
  The colon (:) in "/blog/:id" signifies a DYNAMIC PARAMETER. It matches 
  any value (like the post ID) and makes it available to the detail page.
*/
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Root Route: Main One-Page Portfolio */}
          <Route 
            path="/" 
            element={
              <>
                <Navbar />
                <main>
                  <Hero />        {/* Landing section with intro */}
                  <About />       {/* About me section */}
                  <Skills />      {/* Skills showcase */}
                  <Projects />    {/* Project portfolio */}
                  <Experience />  {/* Journey timeline */}
                  <Blog />        {/* Blog posts list */}
                  <Contact />     {/* Contact form */}
                </main>
                <Footer />
              </>
            } 
          />

          {/* Dynamic Blog Detail Route */}
          <Route path="/blog/:id" element={<BlogPostDetail />} />

          {/* Interactive Project Routes */}
          <Route path="/project/kanban" element={<KanbanProject />} />
          <Route path="/project/expense-tracker" element={<ExpenseProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
