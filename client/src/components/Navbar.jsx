/**
 * ============================================================================
 * Navbar.jsx — Sticky Navigation Bar Component
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * This component renders the top navigation bar of our portfolio website.
 * It includes:
 *   - A gradient-styled logo/name on the left
 *   - Navigation links to different sections of the page
 *   - A mobile hamburger menu that slides in from the right
 *   - A scroll-aware design that changes appearance when you scroll down
 *   - A smooth entrance animation using Framer Motion
 *
 * REACT CONCEPTS COVERED:
 *   1. Importing modules and components
 *   2. useState — managing local component state
 *   3. useEffect — running side effects (scroll listener)
 *   4. Event listeners in React (window scroll)
 *   5. Cleanup functions in useEffect (preventing memory leaks)
 *   6. Conditional class names (dynamic styling)
 *   7. Mapping over arrays to render lists
 *   8. Framer Motion basics (motion components, initial/animate/transition)
 *   9. Handling click events
 *  10. JSX syntax and expressions
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: IMPORTS
// ─────────────────────────────────────────────────────────────────────────────
// In React, we import everything we need at the top of the file.
// Think of imports like ingredients you gather before cooking a recipe.

// 'React' is the core library. We also import two "hooks":
//   • useState  — lets us store and update values that change over time (state)
//   • useEffect — lets us run code at specific moments in a component's life
import React, { useState, useEffect } from 'react';

// Framer Motion gives us the 'motion' object.
// We can write <motion.nav> instead of <nav> to add animations.
// It works exactly like a regular HTML element but with superpowers!
import { motion } from 'framer-motion';

// react-icons gives us thousands of icons as React components.
// FaBars = hamburger menu icon (☰), FaTimes = close/X icon (✕)
// The '/fa' part means we're using the Font Awesome icon set.
import { FaBars, FaTimes } from 'react-icons/fa';

// Import our CSS file for styling this component.
// In Vite + React, you can import CSS files directly into JS files.
// The styles will automatically be applied to matching class names.
import './Navbar.css';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: DEFINE THE NAV LINKS DATA
// ─────────────────────────────────────────────────────────────────────────────
// Instead of writing each link manually in JSX, we store them in an array.
// This is a common React pattern — it keeps our JSX clean and makes it
// easy to add/remove/reorder links without touching the rendering code.
//
// Each object has:
//   • name — the text displayed to the user
//   • href — the anchor link (e.g., '#about' scrolls to the element with id="about")
const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: THE NAVBAR COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// In React, a component is just a function that returns JSX (HTML-like syntax).
// The function name MUST start with a capital letter (React rule).

const Navbar = () => {
  // ───────────────────────────────────────────────────────────────────────────
  // STEP 3a: STATE VARIABLES (useState)
  // ───────────────────────────────────────────────────────────────────────────
  // useState is a "hook" — a special React function that lets components
  // remember values between re-renders.
  //
  // Syntax:  const [value, setValue] = useState(initialValue);
  //   • value       — the current state value (read it like a variable)
  //   • setValue     — a function to UPDATE the state (triggers a re-render)
  //   • initialValue — what the state starts as
  //
  // WHY NOT just use a regular variable like `let isScrolled = false`?
  // Because React wouldn't know the value changed! useState tells React
  // "hey, this value changed, please re-render the component to reflect it."

  // isScrolled: tracks whether the user has scrolled down more than 50px.
  // When true, we add a 'scrolled' class to give the navbar a solid background.
  const [isScrolled, setIsScrolled] = useState(false);

  // isMobileMenuOpen: tracks whether the mobile menu is visible.
  // We toggle this when the user clicks the hamburger icon.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 3b: SIDE EFFECTS (useEffect)
  // ───────────────────────────────────────────────────────────────────────────
  // useEffect runs code AFTER the component renders on screen.
  // It's perfect for things that happen "outside" React, like:
  //   - Adding event listeners to the window
  //   - Fetching data from an API
  //   - Setting up timers
  //
  // Syntax: useEffect(() => { ...code... }, [dependencies]);
  //   • The first argument is a function containing your side-effect code.
  //   • The second argument is a "dependency array":
  //       - []  (empty) = run ONCE when the component first appears (mounts)
  //       - [x] = run whenever the value of 'x' changes
  //       - omitted = run after EVERY render (rarely what you want)

  useEffect(() => {
    // This function runs every time the user scrolls the page.
    // It checks the scroll position and updates our state accordingly.
    const handleScroll = () => {
      // window.scrollY gives us how many pixels the page has been scrolled down.
      // If it's more than 50px, we consider the user "scrolled".
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // PRO TIP: The above if/else can be shortened to:
      // setIsScrolled(window.scrollY > 50);
      // This works because (window.scrollY > 50) evaluates to true or false.
    };

    // Attach our handleScroll function to the window's scroll event.
    // Now every time the user scrolls, handleScroll() will be called.
    window.addEventListener('scroll', handleScroll);

    // ─── CLEANUP FUNCTION ─────────────────────────────────────────────
    // The function we RETURN from useEffect is the "cleanup" function.
    // React calls this when:
    //   1. The component is removed from the page (unmounts)
    //   2. Before re-running the effect (if dependencies change)
    //
    // WHY IS THIS IMPORTANT?
    // Without cleanup, every time this component re-mounts, we'd add
    // ANOTHER scroll listener — leading to memory leaks and bugs.
    // Always clean up event listeners, timers, and subscriptions!
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // ← Empty dependency array means this runs ONCE on mount

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 3c: EVENT HANDLER FUNCTIONS
  // ───────────────────────────────────────────────────────────────────────────
  // These are regular JavaScript functions that we'll attach to JSX elements.
  // In React, event handlers are passed as props (e.g., onClick={handleClick}).

  // Toggle the mobile menu open/closed
  const toggleMobileMenu = () => {
    // We use the functional form of setState here: setValue(prev => newValue)
    // 'prev' gives us the PREVIOUS state value, ensuring accuracy even if
    // React batches multiple state updates together.
    setIsMobileMenuOpen((prev) => !prev);
    // The '!' operator flips the boolean: true → false, false → true
  };

  // Close the mobile menu (used when a link is clicked)
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ───────────────────────────────────────────────────────────────────────────
  // STEP 3d: JSX RETURN (What gets rendered on screen)
  // ───────────────────────────────────────────────────────────────────────────
  // JSX looks like HTML but it's actually JavaScript!
  // Key differences from HTML:
  //   • Use className instead of class (because 'class' is a JS keyword)
  //   • Use camelCase for attributes (onClick, not onclick)
  //   • Wrap JavaScript expressions in curly braces { }
  //   • Every tag must be closed (even <img />, <br />, <input />)

  return (
    <>
      {/*
        FRAMER MOTION — motion.nav
        Instead of a regular <nav>, we use <motion.nav> from Framer Motion.
        This lets us add animation props:
          • initial — the starting state of the animation (before it plays)
          • animate — the ending state (what it animates TO)
          • transition — how the animation behaves (duration, easing, etc.)

        Here, the navbar starts 100px above the screen (y: -100) and slides
        down to its normal position (y: 0) with a smooth ease-out curve.
      */}
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/*
          CONDITIONAL CLASS NAMES — Template Literals
          The className above uses a JavaScript template literal (backticks ``)
          with a ternary operator:
            `navbar ${condition ? 'class-if-true' : 'class-if-false'}`

          When isScrolled is true  → className="navbar scrolled"
          When isScrolled is false → className="navbar"

          The 'scrolled' class adds a solid background and blur effect.
        */}

        <div className="nav-container">
          {/* ── LOGO ──────────────────────────────────────────────────── */}
          {/*
            The 'gradient-text' class is defined in our global index.css.
            It applies a colorful gradient to the text using CSS tricks
            (background-clip: text and -webkit-text-fill-color: transparent).
          */}
          <a href="#home" className="nav-logo gradient-text">
            Priyanshu
          </a>

          {/* ── DESKTOP NAV LINKS ─────────────────────────────────────── */}
          {/*
            MAPPING OVER ARRAYS
            Instead of writing 7 separate <li> elements, we use .map()
            to loop through our navLinks array and generate them dynamically.

            .map() takes each item and transforms it into a JSX element.
            
            THE 'key' PROP
            When rendering lists, React needs a unique 'key' for each item.
            This helps React efficiently update the DOM when items change.
            Using the item's name as the key works here since names are unique.
            WARNING: Never use array index as key if the list can reorder!
          */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ── MOBILE MENU BUTTON ────────────────────────────────────── */}
          {/*
            This button is hidden on desktop (display: none in CSS) and
            only appears on screens smaller than 768px.

            onClick={toggleMobileMenu} — when clicked, it toggles the menu.

            aria-label provides accessibility for screen readers.

            CONDITIONAL RENDERING with Ternary:
            {condition ? <ComponentA /> : <ComponentB />}
            If isMobileMenuOpen is true, show the X icon; otherwise show ☰
          */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────────── */}
      {/*
        The overlay is a semi-transparent dark layer that appears behind
        the mobile menu. Clicking it closes the menu — a common UX pattern
        that lets users dismiss the menu by tapping outside of it.
      */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* ── MOBILE MENU PANEL ───────────────────────────────────────── */}
      {/*
        This is the slide-in panel that appears from the right side.
        The 'open' class moves it from right: -100% to right: 0 via CSS.
      */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-link"
            onClick={closeMobileMenu}
            // ↑ Close the menu when a link is clicked, so the user
            //   can see the section they navigated to.
          >
            {link.name}
          </a>
        ))}
      </div>

      {/*
        FRAGMENTS (<> ... </>)
        A React component can only return ONE root element.
        If we need to return multiple sibling elements (nav + overlay + menu),
        we wrap them in a Fragment (<> </>). It doesn't add any extra HTML
        to the page — it's just a grouping mechanism for React.
      */}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: EXPORT THE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
// 'export default' makes this component available for import in other files.
// Other files can do: import Navbar from './components/Navbar';
//
// "default" means this is the MAIN export of the file.
// A file can have only ONE default export but multiple named exports.
export default Navbar;
