/**
 * ============================================================================
 * Hero.jsx — Hero / Landing Section Component
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * This is the first thing visitors see when they land on the portfolio.
 * It features:
 *   - Animated gradient blobs floating in the background
 *   - A greeting with a wave emoji
 *   - A big name heading with gradient text
 *   - A typing animation that cycles through different titles
 *   - Call-to-action buttons (View Work & Contact)
 *   - Social media icon links
 *   - Staggered entrance animations (elements appear one after another)
 *
 * REACT CONCEPTS COVERED:
 *   1. JSX expressions — embedding JavaScript inside HTML-like syntax
 *   2. Component composition — combining smaller pieces into a bigger UI
 *   3. Third-party component usage (TypeAnimation)
 *   4. Framer Motion variants — defining reusable animation configurations
 *   5. Staggered animations — children appearing with delays
 *   6. motion.div — animating regular HTML elements
 *   7. Infinite animations (repeat: Infinity)
 *   8. Props — passing data to components (href, className, target, etc.)
 *   9. Importing and using icon components from react-icons
 *  10. CSS class composition — combining multiple classes
 * ============================================================================
 */

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

// Framer Motion — 'motion' is the core component for adding animations.
// We use motion.div, motion.section, etc. instead of regular HTML elements.
import { motion } from 'framer-motion';

// TypeAnimation — a component that simulates typing text on screen.
// It creates that cool "typewriter" effect you see on many developer sites.
// We import it as a named import (with curly braces { }).
import { TypeAnimation } from 'react-type-animation';

// Icons from Font Awesome via react-icons.
// Each icon is a React component that renders an SVG icon.
//   FaGithub   → GitHub logo
//   FaLinkedin → LinkedIn logo
//   FaTwitter  → Twitter/X logo
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Import our component-specific styles
import './Hero.css';

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: ANIMATION VARIANTS (Framer Motion)
// ─────────────────────────────────────────────────────────────────────────────
//
// WHAT ARE VARIANTS?
// Variants are named animation states defined as JavaScript objects.
// Instead of writing animation props directly on each element, we define
// them once here and reference them by name. This is especially useful
// for STAGGERED ANIMATIONS (parent-child coordination).
//
// HOW STAGGERED ANIMATIONS WORK:
//   1. The PARENT (container) has a 'staggerChildren' property that adds
//      a delay between each child's animation start.
//   2. Each CHILD has its own animation (e.g., fade in + slide up).
//   3. When the parent animates to 'visible', it triggers children one
//      by one with the specified delay between each.
//
// Result: Elements appear sequentially (greeting → name → typing → etc.)
//         instead of all at once, creating a polished, professional feel.

// Container variant — controls WHEN children start animating
const containerVariants = {
  // 'hidden' state: nothing visible yet
  hidden: {
    opacity: 0,
  },
  // 'visible' state: fade in the container AND trigger children
  visible: {
    opacity: 1,
    transition: {
      // staggerChildren: 0.2 means each child waits 0.2 seconds after
      // the previous one before starting its own animation.
      staggerChildren: 0.2,
      // delayChildren: 0.3 adds a delay before the FIRST child starts.
      // This gives the page a moment to load before animations begin.
      delayChildren: 0.3,
    },
  },
};

// Child variant — the animation each child element performs
const childVariants = {
  // Starting state: invisible and 30px below its final position
  hidden: {
    opacity: 0,
    y: 30,
  },
  // Ending state: fully visible at its natural position
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      // 'easeOut' means the animation starts fast and slows down at the end,
      // which feels natural — like a ball rolling to a stop.
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: THE HERO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const Hero = () => {
  return (
    // The section element is semantically correct for a distinct page section.
    // id="home" lets the navbar's "#home" link scroll to this section.
    <section className="hero" id="home">

      {/* ── BACKGROUND BLOBS ──────────────────────────────────────────── */}
      {/*
        WHAT ARE THESE BLOBS?
        They're large, blurred, colored circles that float around slowly
        in the background. They create a vibrant, dynamic atmosphere
        without distracting from the content.

        Each blob uses motion.div with an infinite animation loop:
          • animate — the values the blob continuously cycles through
          • transition — how long each cycle takes, and repeat: Infinity
            means it never stops

        The 'x', 'y' values move the blob around.
        'scale' makes it grow and shrink.
        'rotate' adds a slow spin.

        'ease: "easeInOut"' makes the movement smooth at both ends,
        creating a gentle, organic floating effect.

        filter: blur(80px) in CSS makes them look like soft gradients
        rather than hard-edged circles.
      */}
      <div className="hero-bg">
        {/* Blob 1 — Purple, top-right area */}
        <motion.div
          className="hero-blob blob-1"
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
            rotate: [0, 45, -30, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,         // Loop forever
            ease: 'easeInOut',        // Smooth start and end
            repeatType: 'loop',       // Restart from beginning each cycle
          }}
        />

        {/* Blob 2 — Pink, bottom-left area */}
        <motion.div
          className="hero-blob blob-2"
          animate={{
            x: [0, -60, 40, -25, 0],
            y: [0, 50, -35, 45, 0],
            scale: [1, 0.85, 1.15, 0.95, 1],
            rotate: [0, -60, 45, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
        />

        {/* Blob 3 — Orange, center-left area */}
        <motion.div
          className="hero-blob blob-3"
          animate={{
            x: [0, 35, -50, 30, 0],
            y: [0, -55, 25, -40, 0],
            scale: [1, 1.1, 0.85, 1.05, 1],
            rotate: [0, 30, -45, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
        />

        {/* Blob 4 — Purple-pink mix, adds extra depth */}
        <motion.div
          className="hero-blob blob-4"
          animate={{
            x: [0, -40, 55, -35, 0],
            y: [0, 35, -45, 30, 0],
            scale: [1, 0.9, 1.2, 0.95, 1],
            rotate: [0, -40, 55, -25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
        />
      </div>

      {/* ── HERO CONTENT ──────────────────────────────────────────────── */}
      {/*
        STAGGERED ANIMATION SETUP:
        This motion.div is the "parent" container for our staggered animation.
        
        • variants={containerVariants} — tells it which animation config to use
        • initial="hidden" — start in the 'hidden' state (opacity: 0)
        • animate="visible" — immediately start transitioning to 'visible'
        
        When this container transitions to 'visible', it will trigger each
        child (that also uses variants) one by one with a 0.2s delay between
        each, thanks to staggerChildren in containerVariants.
      */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── GREETING ────────────────────────────────────────────────── */}
        {/*
          Each child uses variants={childVariants} to inherit the
          staggered animation. It doesn't need initial/animate because
          the PARENT container controls when this child transitions
          from 'hidden' to 'visible'.
          
          This is the power of Framer Motion's variant propagation:
          parent controls timing, children define their own animations.
        */}
        <motion.p className="hero-greeting" variants={childVariants}>
          Hey there! <span className="wave-emoji">👋</span>
        </motion.p>

        {/* ── NAME HEADING ────────────────────────────────────────────── */}
        {/*
          JSX EXPRESSIONS:
          Inside JSX, anything in {curly braces} is JavaScript.
          Here we use a <span> with className='gradient-text' to make
          just the name part colorful while "I'm" stays white.
        */}
        <motion.h1 variants={childVariants}>
          I'm <span className="gradient-text">Priyanshu</span>
        </motion.h1>

        {/* ── TYPING ANIMATION ────────────────────────────────────────── */}
        {/*
          USING THIRD-PARTY COMPONENTS:
          TypeAnimation is a component from the 'react-type-animation' package.
          We use it like any other HTML element, but with special props:
          
          • sequence — an array that alternates between:
              - A string to type out
              - A number (milliseconds to pause before typing the next string)
            So ['Hello', 2000, 'World', 2000] types "Hello", waits 2 seconds,
            deletes it, types "World", waits 2 seconds, and repeats.
          
          • speed — typing speed in milliseconds per character (lower = faster)
          • repeat — how many times to loop (Infinity = forever)
          • wrapper — which HTML element to render ('h2' creates <h2>)
          • className — CSS class for styling
          
          The component handles all the animation logic internally —
          we just configure it with props!
        */}
        <motion.div variants={childVariants}>
          <TypeAnimation
            sequence={[
              'Frontend Developer',
              2000,
              'React Developer',
              2000,
              'Problem Solver',
              2000,
              'Creative Coder',
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            wrapper="h2"
            className="typing-text"
          />
        </motion.div>

        {/* ── DESCRIPTION PARAGRAPH ───────────────────────────────────── */}
        <motion.p className="hero-description" variants={childVariants}>
          I'm passionate about building beautiful, performant web experiences.
          I love turning creative ideas into reality using React and modern web
          technologies. Let's create something amazing together!
        </motion.p>

        {/* ── CALL-TO-ACTION BUTTONS ──────────────────────────────────── */}
        {/*
          CSS CLASS COMPOSITION:
          We combine multiple CSS classes to style these buttons:
            - 'btn' provides base button styles (padding, font-size, etc.)
            - 'btn-primary' adds the gradient background for the main CTA
            - 'btn-outline' adds a bordered, transparent style for secondary CTA
          
          These classes are defined in index.css (global styles).
          
          Using <a> instead of <button> because these navigate to sections.
          Buttons are for actions (submit, delete), links are for navigation.
        */}
        <motion.div className="hero-buttons" variants={childVariants}>
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me
          </a>
        </motion.div>

        {/* ── SOCIAL LINKS ────────────────────────────────────────────── */}
        {/*
          ICON COMPONENTS:
          <FaGithub />, <FaLinkedin />, <FaTwitter /> are React components
          that render SVG icons. They accept standard HTML attributes like
          'size' and can be styled with CSS just like any element.
          
          target="_blank" — Opens the link in a new browser tab.
          rel="noopener noreferrer" — Security measure! Without this,
            the new page could access our page via window.opener.
            Always use this with target="_blank".
          
          aria-label — Accessibility attribute for screen readers.
            Since the links contain only icons (no text), screen readers
            need aria-label to know what the link does.
        */}
        <motion.div className="hero-socials" variants={childVariants}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="Twitter Profile"
          >
            <FaTwitter />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: EXPORT
// ─────────────────────────────────────────────────────────────────────────────
// Make this component available for import in other files (like App.jsx).
export default Hero;
