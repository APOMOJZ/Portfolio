/**
 * =============================================================================
 * 📘 ABOUT COMPONENT — Your "About Me" Section
 * =============================================================================
 *
 * This component teaches several important React concepts:
 *
 * 1. COMPONENT COMPOSITION:
 *    React encourages building UIs from small, reusable pieces. This component
 *    is itself a piece of the larger App — and inside it, we compose smaller
 *    pieces like stat cards and decorative elements. Think of it like LEGO
 *    blocks: each block is simple, but together they build something amazing.
 *
 * 2. whileInView ANIMATIONS (Framer Motion):
 *    Instead of animating on page load, we animate when the element scrolls
 *    into the viewport. This creates a delightful "reveal" effect as the user
 *    scrolls down. We use:
 *      - initial={{ opacity: 0, y: 50 }}  → Start invisible & shifted down
 *      - whileInView={{ opacity: 1, y: 0 }} → Animate to visible & original pos
 *      - viewport={{ once: true }}         → Only animate once (not every scroll)
 *
 * 3. TWO-COLUMN LAYOUT WITH CSS GRID:
 *    We use a CSS Grid (.about-grid) to create a responsive two-column layout.
 *    On desktop: image on left, text on right.
 *    On mobile: everything stacks into a single column (handled in About.css).
 *
 * 4. CUSTOM HOOKS & useEffect FOR COUNTING ANIMATION:
 *    We create a small counter animation using useState + useEffect + useRef.
 *    This teaches how React's state system can power visual animations.
 *
 * 5. DATA-DRIVEN RENDERING:
 *    The stats section uses an array of data objects and .map() to render
 *    multiple stat cards. This is a core React pattern — define your data,
 *    then let React render it dynamically.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 📦 IMPORTS
// -----------------------------------------------------------------------------

/**
 * React is the core library. We import specific "hooks" from it:
 *
 * - useState:  Lets a component "remember" values between renders.
 *              Think of it as a variable that, when changed, tells React
 *              to re-draw (re-render) the component.
 *
 * - useEffect: Lets you run "side effects" — code that happens AFTER React
 *              renders. Perfect for timers, API calls, or DOM interactions.
 *
 * - useRef:    Creates a "ref" — a mutable value that persists across renders
 *              WITHOUT causing a re-render when changed. We use it to reference
 *              DOM elements or store mutable values like interval IDs.
 */
import React, { useState, useEffect, useRef } from 'react';

/**
 * Framer Motion is an animation library for React.
 * - motion: A special object that provides animated versions of HTML elements.
 *           For example, motion.div is like a <div> but with superpowers!
 *           You can animate it with props like initial, animate, whileInView, etc.
 *
 * - useInView: A hook that tells you whether an element is visible in the
 *              viewport. We use this to trigger our counting animation.
 */
import { motion, useInView } from 'framer-motion';

/**
 * React Icons gives us access to thousands of SVG icons as React components.
 * FaDownload is a download icon we'll use on the "Download Resume" button.
 */
import { FaDownload } from 'react-icons/fa';

/**
 * We import our component-specific CSS file. In React, each component
 * can have its own CSS file. This keeps styles organized and modular.
 * The styles in this file will apply globally (not scoped), so we use
 * unique class names (prefixed with "about-") to avoid conflicts.
 */
import './About.css';

// -----------------------------------------------------------------------------
// 🔢 AnimatedCounter — A Mini Component for Counting Up Numbers
// -----------------------------------------------------------------------------

/**
 * COMPONENT COMPOSITION IN ACTION:
 * This is a small, focused component used INSIDE the About component.
 * It has one job: animate a number from 0 to a target value.
 *
 * Props (inputs):
 * - target: The final number to count up to (e.g., 10, 500, 15)
 * - suffix: A string to append after the number (e.g., "+")
 * - duration: How long the counting animation takes (in milliseconds)
 *
 * HOW IT WORKS:
 * 1. We create a ref to the <span> element so useInView can watch it.
 * 2. When the element scrolls into view (isInView becomes true), we start
 *    a setInterval timer that increments the count state.
 * 3. When count reaches the target, we clear the interval.
 * 4. We clean up the interval in the useEffect return (cleanup function)
 *    to prevent memory leaks if the component unmounts mid-animation.
 */
const AnimatedCounter = ({ target, suffix = '+', duration = 2000 }) => {
  /**
   * useState returns an array with exactly 2 elements:
   *   [0] The current state value (count)
   *   [1] A function to update it (setCount)
   *
   * When you call setCount(newValue), React re-renders this component
   * with the new value. This is how the number visually changes on screen.
   */
  const [count, setCount] = useState(0);

  /**
   * useRef creates a "ref object" with a .current property.
   * We attach this ref to a DOM element (the <span>) so that
   * useInView can observe whether it's visible in the viewport.
   *
   * Refs are also great for storing values that:
   * - Need to persist across renders (like interval IDs)
   * - Should NOT trigger a re-render when changed
   */
  const countRef = useRef(null);

  /**
   * useInView is a Framer Motion hook that returns true/false based on
   * whether the referenced element is currently visible in the viewport.
   * The { once: true } option means it only triggers once — after the
   * element first appears, isInView stays true forever.
   */
  const isInView = useInView(countRef, { once: true });

  /**
   * useEffect — The Side Effect Hook
   *
   * This runs AFTER React renders the component. The dependency array
   * [isInView, target, duration] tells React: "Re-run this effect only
   * when one of these values changes."
   *
   * CLEANUP FUNCTION (the returned function):
   * React calls this when the component unmounts or before the effect
   * re-runs. We use it to clear the interval timer, preventing memory
   * leaks. Always clean up timers, subscriptions, and listeners!
   */
  useEffect(() => {
    // Don't start counting until the element is in view
    if (!isInView) return;

    // Calculate how often to increment (e.g., count to 500 in 2000ms)
    const stepTime = Math.max(Math.floor(duration / target), 10);
    let currentCount = 0;

    // setInterval calls the function repeatedly at the given interval
    const timer = setInterval(() => {
      currentCount += 1;
      setCount(currentCount);

      // When we reach the target, stop the timer
      if (currentCount >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    // CLEANUP: Clear interval if component unmounts during animation
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={countRef} className="stat-number">
      {count}
      {suffix}
    </span>
  );
};

// -----------------------------------------------------------------------------
// 📊 Stats Data — Driving the UI with Data
// -----------------------------------------------------------------------------

/**
 * DATA-DRIVEN UI PATTERN:
 * Instead of writing three separate stat card JSX blocks (copy-paste = bad!),
 * we define our data in an array and use .map() to generate the JSX.
 *
 * Benefits:
 * - Easy to add/remove/reorder stats — just edit this array
 * - No duplicate code
 * - Each item needs a unique "id" for React's key prop (explained below)
 */
const statsData = [
  { id: 1, target: 2, suffix: '', label: 'Projects Completed' },
  { id: 2, target: 150, suffix: '+', label: 'Cups of Coffee' },
  { id: 3, target: 5, suffix: '', label: 'Technologies Learned' },
];

// -----------------------------------------------------------------------------
// 🎨 Decorative Dots Data — Fun Floating Elements Around the Image
// -----------------------------------------------------------------------------

/**
 * These define the colorful floating dots/circles that orbit around the
 * profile image. Each dot has:
 * - size: width/height in pixels
 * - color: the border color (creates a ring effect)
 * - position: CSS positioning (top, left, right, bottom)
 * - delay: stagger the floating animation for a more organic feel
 */
const decorators = [
  {
    id: 1,
    size: 60,
    color: 'var(--color-primary)',
    style: { top: '-20px', right: '-25px' },
    delay: 0,
  },
  {
    id: 2,
    size: 40,
    color: 'var(--color-secondary)',
    style: { bottom: '30px', left: '-20px' },
    delay: 0.5,
  },
  {
    id: 3,
    size: 50,
    color: 'var(--color-accent)',
    style: { top: '50%', right: '-30px' },
    delay: 1,
  },
  {
    id: 4,
    size: 30,
    color: 'var(--color-accent-cyan)',
    style: { bottom: '-10px', right: '40px' },
    delay: 1.5,
  },
];

// -----------------------------------------------------------------------------
// 🏠 ABOUT COMPONENT — The Main Export
// -----------------------------------------------------------------------------

/**
 * THE ABOUT COMPONENT
 *
 * This is a "functional component" — a JavaScript function that returns JSX.
 * JSX looks like HTML but it's actually JavaScript. React converts it into
 * real DOM elements behind the scenes.
 *
 * Key things to notice:
 * - className instead of class (because "class" is reserved in JavaScript)
 * - Curly braces {} inside JSX to embed JavaScript expressions
 * - motion.div instead of div for animated elements
 * - Self-closing tags for elements with no children: <br />
 */
const About = () => {
  return (
    /**
     * SECTION WRAPPER
     * - id="about": Used for scroll-to navigation (when someone clicks
     *   "About" in the navbar, the page scrolls to this element)
     * - className="section about": "section" provides global section styles,
     *   "about" provides component-specific styles
     */
    <section id="about" className="section about">
      <div className="container">
        {/* ----------------------------------------------------------------
         * SECTION HEADER
         * motion.div wraps the title and subtitle with a scroll reveal
         * animation. When this element scrolls into view:
         * - opacity goes from 0 → 1 (fade in)
         * - y goes from 30 → 0 (slide up 30px)
         * - transition.duration controls speed (0.6 seconds)
         * ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            {/* gradient-text applies a colorful gradient to the text */}
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know the developer behind the code
          </p>
        </motion.div>

        {/* ----------------------------------------------------------------
         * TWO-COLUMN GRID LAYOUT
         * The .about-grid class uses CSS Grid with two equal columns.
         * On mobile (< 768px), it collapses to a single column.
         * ---------------------------------------------------------------- */}
        <div className="about-grid">
          {/* ==============================================================
           * LEFT COLUMN — Profile Image with Decorations
           * ============================================================== */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* The "frame" has a gradient border created with the
                background trick: the outer div has a gradient background,
                and the inner div sits on top with a solid background,
                creating the illusion of a gradient border. */}
            <div className="about-image-frame">
              <div className="about-image-inner">
                {/* Colorful gradient placeholder for your photo.
                    Replace this div with an <img> tag when you have
                    a real profile photo! */}
                <div className="about-image-placeholder">
                  <span className="about-image-emoji">👨‍💻</span>
                </div>
              </div>
            </div>

            {/* FLOATING DECORATORS — Fun circles around the image
             *
             * We use .map() to generate multiple motion.div elements
             * from our decorators array. Each decorator floats up and
             * down with a repeating animation.
             *
             * KEY PROP: React needs a unique "key" for each element in
             * a list so it can efficiently update the DOM. Without keys,
             * React would re-render ALL items when one changes. With keys,
             * it only updates what changed. Always use a stable, unique
             * value (like an id) — never use array index in production!
             *
             * ANIMATION EXPLAINED:
             * - animate={{ y: [0, -15, 0] }}: Moves up 15px then back
             * - transition.repeat: Infinity means it loops forever
             * - transition.delay: Staggers each dot's animation start
             */}
            {decorators.map((dot) => (
              <motion.div
                key={dot.id}
                className="about-decorator"
                style={{
                  width: dot.size,
                  height: dot.size,
                  borderColor: dot.color,
                  ...dot.style,
                }}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: dot.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>

          {/* ==============================================================
           * RIGHT COLUMN — Text Content & Stats
           * ============================================================== */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="about-heading">
              A passionate React & Frontend Developer 🚀
            </h3>

            {/* About text paragraphs */}
            <p className="about-text">
              Hey there! I&apos;m a self-taught developer on an exciting journey
              through the world of web development. What started as curiosity
              about how websites work has turned into a full-blown passion for
              building modern, responsive, and user-friendly web applications.
            </p>
            <p className="about-text">
              I specialize in **Frontend development using React**, focusing on building clean, interactive, and responsive user interfaces. I plan to learn Node.js, Express, and databases (the rest of the MERN stack) in the near future to transition into full-stack development.
            </p>
            <p className="about-text">
              When I&apos;m not coding, you&apos;ll find me building interactive web tools, contributing to open-source, or fueling my creativity with a good cup of coffee ☕. I believe in writing clean, modular code and constantly learning.
            </p>

            {/* ============================================================
             * STATS ROW — Animated Counting Numbers
             *
             * Here we use the DATA-DRIVEN pattern:
             * 1. statsData is an array of objects
             * 2. .map() iterates over each item
             * 3. For each item, we return a JSX element (stat card)
             *
             * This is equivalent to writing three <div> blocks manually,
             * but MUCH better because:
             * - Less code duplication
             * - Easy to modify (just edit the array)
             * - Scales effortlessly (add 10 more stats? Just add to array)
             *
             * STAGGER ANIMATION:
             * Notice the delay: 0.1 * index — this makes each card appear
             * slightly after the previous one, creating a wave effect.
             * ============================================================ */}
            <div className="about-stats">
              {statsData.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {/* AnimatedCounter is our custom component (defined above).
                   * We pass data to it via "props" — like function arguments.
                   * target={stat.target} passes the number to count to.
                   * suffix={stat.suffix} passes the "+" character. */}
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                  />
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* DOWNLOAD RESUME BUTTON
             * motion.a instead of <a> for hover/tap animations.
             * whileHover scales up slightly for a satisfying interaction.
             * whileTap scales down to simulate a button press.
             *
             * href="#": Replace "#" with the actual link to your resume PDF!
             * target="_blank": Opens in a new tab
             * rel="noopener noreferrer": Security best practice for
             *   target="_blank" links (prevents the new page from accessing
             *   window.opener) */}
            <motion.a
              href="#"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDownload />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 📤 EXPORT
// -----------------------------------------------------------------------------

/**
 * DEFAULT EXPORT:
 * This makes the About component available for import in other files.
 * In your App.jsx, you'd write: import About from './components/About';
 *
 * There are two types of exports in JavaScript:
 * - Default export: One per file. Import without curly braces.
 *   export default About → import About from './About'
 *
 * - Named export: Multiple per file. Import WITH curly braces.
 *   export const About → import { About } from './About'
 *
 * Convention: React components typically use default exports.
 */
export default About;
