/**
 * ============================================================================
 * Footer.jsx - Footer Component
 * ============================================================================
 *
 * The footer is the bottom section of every website. It typically contains:
 * - Brand/logo information
 * - Navigation links (Quick Links)
 * - Social media links
 * - Copyright information
 *
 * This component teaches several JavaScript and React concepts:
 *
 * 1. TEMPLATE LITERALS (Backtick Strings):
 *    JavaScript has a special string syntax using backticks (` `)
 *    that allows you to embed expressions inside strings:
 *      `Hello, ${name}!`  →  "Hello, John!"
 *    The ${...} syntax evaluates the JavaScript expression inside
 *    and inserts the result into the string.
 *
 * 2. DATE OBJECT:
 *    JavaScript's built-in Date class gives us date/time information.
 *    new Date() creates a Date object for the CURRENT moment.
 *    .getFullYear() returns the 4-digit year (e.g., 2026).
 *    We use this to make the copyright year always up-to-date!
 *
 * 3. window.scrollTo():
 *    A built-in browser API that scrolls the page to a specific position.
 *    { top: 0, behavior: 'smooth' } means:
 *    - Scroll to the very top of the page (0 pixels from top)
 *    - Use smooth scrolling animation (not instant jump)
 *
 * ============================================================================
 */

import React from 'react';

// Import icons for social links and back-to-top button
// FaArrowUp is an upward arrow icon used for the "back to top" button
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaArrowUp } from 'react-icons/fa';

// Import component-specific styles
import './Footer.css';

/**
 * Footer Component
 *
 * Unlike the Contact component, the Footer doesn't need any state (useState)
 * because it doesn't have interactive data that changes over time.
 * It's a "presentational" or "stateless" component — it just displays content.
 *
 * Not every component needs state! Many components simply receive props
 * or display static content. This is perfectly normal and actually preferred
 * when state isn't needed (simpler = better).
 */
const Footer = () => {
  // ========================================================================
  // DATA ARRAYS
  // ========================================================================
  //
  // We define navigation links and social links as arrays of objects.
  // This is the "data-driven rendering" pattern we learned in Contact.jsx.
  //
  // Benefits:
  // - Easy to add/remove/reorder links — just change the array
  // - No need to duplicate JSX for each link
  // - Consistent structure for all items
  // ========================================================================

  /**
   * Quick Links — Internal navigation links
   *
   * Each object has:
   * - label: The text the user sees
   * - href: Where the link goes (# + section id for same-page navigation)
   *
   * The "#" prefix creates an "anchor link" that scrolls to the element
   * with the matching id attribute. For example:
   *   href="#about" scrolls to <section id="about">
   */
  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  /**
   * Social Links — External links to social media profiles
   *
   * Each object has:
   * - icon: A React component (from react-icons) rendered as JSX
   * - href: The external URL
   * - label: Used for aria-label (accessibility for screen readers)
   */
  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
  ];

  // ========================================================================
  // RENDER
  // ========================================================================
  return (
    <footer className="footer">
      {/* ================================================================
          GRADIENT LINE — Decorative top border
          ================================================================
          This is a thin 2px line with a gradient background.
          It visually separates the footer from the content above
          and adds a splash of color. Simple but effective!
          
          The gradient is defined in our CSS variables as --gradient-primary,
          which transitions from purple to pink to orange.
          ================================================================ */}
      <div className="footer-gradient-line"></div>

      <div className="container">
        {/* ================================================================
            FOOTER CONTENT — Three-Column Grid
            ================================================================
            The CSS grid splits this into three columns:
            - Column 1 (2fr): Brand info — takes up 2x the space
            - Column 2 (1fr): Quick Links
            - Column 3 (1fr): Social Connect
            
            The "2fr 1fr 1fr" ratio gives the brand column more room
            since it has more content (logo + tagline paragraph).
            ================================================================ */}
        <div className="footer-content">
          {/* Column 1: Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              {/* ============================================================
                  GRADIENT TEXT
                  ============================================================
                  The "gradient-text" class applies a gradient color to text.
                  This is achieved through a CSS trick:
                  1. Set background to a gradient
                  2. Use background-clip: text (clips gradient to text shape)
                  3. Set text color to transparent (reveals the gradient behind)
                  
                  This creates the illusion of text colored with a gradient!
                  ============================================================ */}
              <span className="gradient-text">Priyanshu</span>
            </h3>
            <p className="footer-tagline">
              A passionate frontend developer crafting beautiful and functional
              web experiences. Always learning, always building.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-nav">
            <h4 className="footer-title">Quick Links</h4>
            {/* ============================================================
                RENDERING A LIST — The .map() Pattern
                ============================================================
                We convert the quickLinks array into a list of <li> elements.
                
                <ul> (unordered list) contains <li> (list items).
                CSS removes the default bullet points with list-style: none.
                
                key={link.label}:
                  We use the label as the key since each label is unique.
                  Using a meaningful, stable key is better than using the
                  array index because it helps React track items correctly
                  even if the array order changes.
                ============================================================ */}
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className="footer-connect">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-socials">
              {/* ============================================================
                  SOCIAL ICONS — Mapped from socialLinks array
                  ============================================================
                  Each social link:
                  - Opens in a new tab (target="_blank")
                  - Has security attributes (rel="noopener noreferrer")
                  - Has an aria-label for screen reader accessibility
                  
                  aria-label is crucial for accessibility! Since these links
                  only contain an icon (no visible text), screen readers
                  wouldn't know what the link does without aria-label.
                  ============================================================ */}
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================
            FOOTER BOTTOM BAR
            ================================================================
            Contains the copyright notice and a "back to top" button.
            ================================================================ */}
        <div className="footer-bottom">
          {/* ==============================================================
              COPYRIGHT WITH DYNAMIC YEAR
              ==============================================================
              {new Date().getFullYear()} — Let's break this down:
              
              1. new Date()
                 → Creates a new Date object representing RIGHT NOW
                 → It contains the current date and time
              
              2. .getFullYear()
                 → Extracts the 4-digit year from the Date object
                 → Returns a number like 2026
              
              3. The curly braces {} embed this JavaScript expression in JSX
              
              WHY NOT just type "2026"?
              → Because next year it would be outdated!
              → Using getFullYear() means the year ALWAYS matches the
                current year automatically. No manual updates needed!
              
              The ❤️ emoji adds a personal touch. Emojis work in JSX
              just like in regular HTML — just paste them in!
              ============================================================== */}
          <p className="footer-copyright">
            © {new Date().getFullYear()} Priyanshu. Made with ❤️ and React
          </p>

          {/* ==============================================================
              BACK TO TOP BUTTON
              ==============================================================
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              
              Let's break this down piece by piece:
              
              onClick={...}
                → React's click event handler (runs when button is clicked)
              
              () => ...
                → An arrow function (anonymous/inline function)
                → We use an arrow function here because we need to CALL
                  window.scrollTo with arguments. If we wrote:
                  onClick={window.scrollTo({ top: 0 })}
                  It would execute IMMEDIATELY on render, not on click!
              
              window.scrollTo({ top: 0, behavior: 'smooth' })
                → window: The browser's global object (represents the browser window)
                → scrollTo(): Scrolls the page to a specific position
                → top: 0: Scroll to the very top (0 pixels from top)
                → behavior: 'smooth': Animate the scroll (not instant jump)
              
              Without behavior: 'smooth', the page would JUMP to the top
              instantly. The smooth behavior creates a pleasant animation
              that helps the user understand they've been scrolled up.
              
              aria-label="Back to top"
                → Tells screen readers what this button does
                → Since the button only has an icon (↑), there's no visible
                  text for screen readers to read. aria-label provides that.
              ============================================================== */}
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

/**
 * EXPORT — Make this component importable
 *
 * In your App.jsx, you'd import and use it like:
 *
 *   import Footer from './components/Footer';
 *
 *   function App() {
 *     return (
 *       <div>
 *         {/* ...other sections... *\/}
 *         <Footer />    ← Self-closing tag since Footer has no children
 *       </div>
 *     );
 *   }
 *
 * The Footer is typically the LAST component rendered in your app,
 * appearing at the bottom of every page.
 */
export default Footer;
