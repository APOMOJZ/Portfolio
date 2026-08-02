/**
 * ============================================================
 * 📂 Projects.jsx - Project Showcase Section
 * ============================================================
 *
 * This component displays a filterable grid of project cards.
 * It's one of the most important sections of a portfolio!
 *
 * 🎓 KEY CONCEPTS YOU'LL LEARN:
 * 1. useState - Managing which filter is active
 * 2. Array .filter() - Showing only matching projects
 * 3. Array .map() - Rendering a list of project cards
 * 4. AnimatePresence - Animating items as they enter/exit
 * 5. layout animations - Smooth repositioning when items change
 *
 * Think of this component like a photo gallery with category
 * tabs. When you click "React", only React projects show up,
 * with a smooth animation for the transition.
 * ============================================================
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// 🎓 useState is a React "Hook" - a special function that lets
// your component remember things (like which filter button is active).
// Without useState, clicking a button would do nothing because
// the component wouldn't know it needs to re-render.

import { motion, AnimatePresence } from 'framer-motion';
// 🎓 framer-motion is an animation library for React:
// - motion: wraps HTML elements to make them animatable
//   e.g., <motion.div> instead of <div>
// - AnimatePresence: watches for items entering/leaving the DOM
//   and plays entrance/exit animations automatically

import { FaCode, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
// 🎓 react-icons gives us thousands of icons as React components.
// We import only the ones we need (this is called "tree-shaking"
// and keeps our bundle size small).
// - FaCode: a code bracket icon (</>)
// - FaGithub: the GitHub logo
// - FaExternalLinkAlt: an external link arrow icon

import './Projects.css';
// 🎓 Importing CSS files in React applies those styles globally.
// The styles in Projects.css will be available to this component
// and technically to all other components too. That's why we use
// specific class names like "project-card" to avoid conflicts.

/**
 * 🎓 DATA ARRAY - Defining our projects
 * ----------------------------------------
 * In a real app, this data might come from an API or database.
 * For now, we define it as a JavaScript array of objects.
 *
 * Each object represents one project with:
 * - id: unique identifier (important for React's "key" prop)
 * - title: the project name
 * - description: a short summary
 * - tags: technologies used (array of strings)
 * - category: used for filtering ('react', 'node', 'fullstack')
 * - github: link to source code
 * - live: link to live demo
 * - gradient: CSS gradient for the card's visual header area
 */
const projectsData = [
  {
    id: 101,
    title: 'Interactive Kanban Board',
    description:
      'A task management board with multiple columns, priority markers, search capability, and local storage persistence for seamless usage.',
    tags: ['React', 'Framer Motion', 'Local Storage', 'CSS Grid'],
    category: 'react',
    github: 'https://github.com',
    live: '/project/kanban',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
  },
  {
    id: 102,
    title: 'Financial Expense Tracker',
    description:
      'A personal finance manager with visual SVG progress indicators, transaction categories, history filters, and local storage data storage.',
    tags: ['React', 'SVG Graphics', 'Local Storage', 'CSS Flexbox'],
    category: 'react',
    github: 'https://github.com',
    live: '/project/expense-tracker',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  },
];

/**
 * 🎓 FILTER CATEGORIES
 * ----------------------
 * This array defines the filter buttons shown above the grid.
 * Each object has:
 * - label: what the user sees on the button
 * - value: what we use internally for filtering logic
 *
 * 'All' is special - it means "show everything" (no filtering).
 */
const filterCategories = [
  { label: 'All', value: 'All' },
  { label: 'React', value: 'react' },
];

/**
 * 🎓 ANIMATION VARIANTS
 * -----------------------
 * Framer Motion uses "variants" to define animation states.
 * Think of them as keyframes in CSS animations, but more powerful.
 *
 * - "hidden": the starting state (before animation)
 * - "visible": the ending state (after animation)
 *
 * The "transition" object controls HOW the animation plays:
 * - staggerChildren: delays each child's animation by 0.1s
 *   so cards appear one after another, not all at once
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      // 🎓 staggerChildren makes each child element start its
      // animation 0.1 seconds after the previous one.
      // This creates a beautiful cascading effect!
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    // 🎓 The card starts invisible (opacity: 0),
    // shifted down 30px (y: 30), and slightly smaller (scale: 0.95)
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
    // 🎓 The card animates to fully visible, original position,
    // and full size over 0.4 seconds with an easeOut curve
    // (starts fast, ends slow - feels natural)
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
    // 🎓 When a card is removed (filtered out), it fades out
    // and shrinks slightly. This is used by AnimatePresence.
  },
};

/**
 * 🎓 THE PROJECTS COMPONENT
 * ===========================
 * This is a "functional component" - a JavaScript function that
 * returns JSX (the HTML-like syntax React uses).
 *
 * The function runs every time the component needs to re-render
 * (e.g., when the user clicks a filter button and state changes).
 */
const Projects = () => {
  /**
   * 🎓 useState HOOK - The Heart of Interactivity
   * ------------------------------------------------
   * useState('All') creates a piece of "state" with initial value 'All'.
   * It returns an array with exactly 2 items:
   *
   * 1. activeFilter  - the CURRENT value (starts as 'All')
   * 2. setActiveFilter - a FUNCTION to UPDATE the value
   *
   * WHY do we need this?
   * Regular variables reset every time the component re-renders.
   * State variables PERSIST between renders AND trigger a re-render
   * when they change. So when we call setActiveFilter('react'),
   * React knows to re-run this function and update the UI.
   *
   * The [x, y] syntax is called "array destructuring" - it's
   * a shorthand for:
   *   const stateArray = useState('All');
   *   const activeFilter = stateArray[0];
   *   const setActiveFilter = stateArray[1];
   */
  const [activeFilter, setActiveFilter] = useState('All');

  /**
   * 🎓 FILTERING LOGIC - Array .filter() Method
   * -----------------------------------------------
   * .filter() creates a NEW array containing only items that
   * pass a test (return true from the callback function).
   *
   * How it works step by step:
   * 1. If activeFilter is 'All' → return the entire array (no filtering)
   * 2. Otherwise → keep only projects whose category matches
   *
   * Example: if activeFilter is 'react'
   *   projectsData.filter(project => project.category === 'react')
   *   This checks each project: "Is your category 'react'?"
   *   Only projects that answer "yes" make it into filteredProjects.
   *
   * IMPORTANT: .filter() does NOT modify the original array!
   * It creates a brand new array. This is called "immutability"
   * and it's a core principle in React.
   */
  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="section">
      {/* 🎓 The id="projects" lets the navbar link scroll to this section */}
      <div className="container">
        {/* ---- Section Header ---- */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          // 🎓 whileInView triggers the animation when the element
          // scrolls into the viewport. No need for scroll event listeners!
          viewport={{ once: true, margin: '-100px' }}
          // 🎓 once: true means animate only the first time it appears.
          // margin: '-100px' starts the animation 100px before it's fully visible.
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Here are some of the projects I&apos;ve built while learning web
            development. Each one taught me something new!
          </p>
        </motion.div>

        {/* ---- Filter Buttons ---- */}
        {/*
          🎓 .map() - Rendering Lists in React
          .map() transforms each item in an array into a React element.
          It's like a for loop but returns a new array of JSX elements.

          For each category, we create a button. When clicked, it calls
          setActiveFilter() to update the state, which triggers a re-render,
          which re-runs the filter logic above, which updates the grid.

          The "key" prop is REQUIRED when rendering lists. React uses it
          to efficiently track which items changed, were added, or removed.
          Always use a unique, stable value (not the array index if items
          can be reordered).
        */}
        <div className="filter-buttons">
          {filterCategories.map((category) => (
            <button
              key={category.value}
              className={`filter-btn ${
                activeFilter === category.value ? 'active' : ''
              }`}
              // 🎓 Template literal with ternary operator:
              // If this category is the active one, add the 'active' class
              // which applies the gradient background style from CSS.
              // The ternary (condition ? 'yes' : 'no') is like a mini if/else.
              onClick={() => setActiveFilter(category.value)}
              // 🎓 onClick takes a FUNCTION, not a function call!
              // ✅ onClick={() => setActiveFilter(category.value)}
              // ❌ onClick={setActiveFilter(category.value)} ← runs immediately!
              // The arrow function creates a new function that will only
              // run when the button is actually clicked.
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* ---- Project Cards Grid ---- */}
        {/*
          🎓 AnimatePresence - The Magic of Exit Animations
          --------------------------------------------------
          Normally in React, when an element is removed from the DOM,
          it just *disappears* instantly. AnimatePresence wraps a list
          and tells Framer Motion: "Hey, when items are about to leave,
          play their exit animation FIRST, then remove them."

          This is what creates the smooth fade-out when you filter projects.
          Without AnimatePresence, filtered-out cards would just vanish.
        */}
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          // 🎓 By setting variants on the parent AND children,
          // the parent's staggerChildren automatically applies
          // to all children with matching variant names.
        >
          <AnimatePresence mode="popLayout">
            {/*
              🎓 mode="popLayout" tells AnimatePresence how to handle
              the layout when items exit. "popLayout" removes the item
              from the layout flow immediately and animates it out
              in place, preventing layout jumps.
            */}
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                // 🎓 The key MUST be unique and stable.
                // We use project.id (not array index) because
                // the order changes when filtering. If we used index,
                // React would think card 0 transformed into a
                // different project instead of recognizing it's a
                // new card - causing weird animation glitches.
                className="project-card"
                variants={cardVariants}
                layout
                // 🎓 The "layout" prop is MAGIC! ✨
                // When the filtered list changes and cards reposition,
                // layout tells Framer Motion to smoothly animate the
                // card from its old position to its new position.
                // Without it, cards would jump instantly to new spots.
                exit="exit"
                // 🎓 exit="exit" tells this element which variant
                // to use when AnimatePresence removes it.
              >
                {/* -- Card Top: Gradient Visual Area -- */}
                <div
                  className="project-image"
                  style={{ background: project.gradient }}
                  // 🎓 Inline styles in React use an OBJECT, not a string.
                  // style={{ background: '...' }} ← note the double braces!
                  // Outer {} = JSX expression, Inner {} = JavaScript object
                >
                  <FaCode />
                  {/* 🎓 React icons are just components! Use them like HTML tags. */}
                </div>

                {/* -- Card Body: Project Info -- */}
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  {/* -- Tags List -- */}
                  {/*
                    🎓 Nested .map() - A map inside a map!
                    For each project, we loop through its tags array
                    to create small pill-shaped badges.

                    Using the tag string itself as the key is fine here
                    because tags within a single project are unique.
                  */}
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* -- Action Links (GitHub + Live Demo) -- */}
                  <div className="project-links">
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      // 🎓 target="_blank" opens the link in a new tab.
                      // rel="noopener noreferrer" is a SECURITY best practice!
                      // Without it, the new page could access your page's
                      // window object (a vulnerability called "tabnapping").
                    >
                      <FaGithub /> GitHub
                    </a>
                    {project.live.startsWith('/') ? (
                      <Link to={project.live} className="project-link">
                        <FaExternalLinkAlt /> Live Demo
                      </Link>
                    ) : (
                      <a
                        href={project.live}
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * 🎓 DEFAULT EXPORT
 * -------------------
 * "export default" means this is the main thing this file provides.
 * Other files can import it like:
 *   import Projects from './Projects';
 *
 * You can only have ONE default export per file.
 * (Named exports, like "export const x = ...", can have many.)
 */
export default Projects;
