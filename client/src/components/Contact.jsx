/**
 * ============================================================================
 * Contact.jsx - Contact Section Component
 * ============================================================================
 *
 * This component is one of the most interactive parts of our portfolio!
 * It teaches several important React concepts:
 *
 * 1. CONTROLLED COMPONENTS:
 *    In React, a "controlled component" is a form element (like <input>)
 *    whose value is controlled by React state. Instead of the browser
 *    managing the input's value, WE manage it through useState.
 *    This gives us full control over the form data at all times.
 *
 * 2. EVENT HANDLING:
 *    React uses synthetic events (wrappers around native browser events).
 *    We attach event handlers like onChange and onSubmit to elements.
 *    The event object (often called 'e') contains useful info like:
 *    - e.target.name  → the "name" attribute of the input
 *    - e.target.value → the current value typed by the user
 *    - e.preventDefault() → stops the default browser behavior
 *
 * 3. SPREAD OPERATOR (...):
 *    The spread operator creates a COPY of an object/array.
 *    { ...formData } means "take all properties from formData and
 *    spread them into a new object". This is crucial in React because
 *    we should NEVER mutate state directly — always create new objects!
 *
 * 4. COMPUTED PROPERTY NAMES [e.target.name]:
 *    In JavaScript, [variable] inside an object literal uses the
 *    variable's VALUE as the property name. So if e.target.name is
 *    "email", then { [e.target.name]: value } becomes { email: value }.
 *    This lets ONE handler function work for ALL form inputs!
 *
 * ============================================================================
 */

// React core imports
// useState is a "Hook" — a special function that lets functional components
// have their own state (data that can change over time and trigger re-renders)
import React, { useState } from 'react';

// Framer Motion is an animation library for React
// motion — wraps HTML elements to make them animatable (e.g., motion.div)
// These "motion components" accept special props like animate, whileInView, etc.
import { motion } from 'framer-motion';

// React Icons provides popular icon sets as React components
// We import specific icons from the Font Awesome icon set ('fa' = Font Awesome)
// Each icon is a component we can render like <FaEnvelope />
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

// Import our CSS styles for this component
// In React, each component typically has its own CSS file for organization
import './Contact.css';

/**
 * Contact Component
 *
 * This is a "functional component" — a JavaScript function that returns JSX.
 * JSX looks like HTML but it's actually JavaScript! React converts it to
 * real DOM elements behind the scenes.
 *
 * Functional components are the modern way to write React components.
 * They replaced the older "class components" and are simpler to read and write.
 */
const Contact = () => {
  // ========================================================================
  // STATE MANAGEMENT with useState
  // ========================================================================
  //
  // useState returns an array with exactly 2 elements:
  //   [0] The current state value
  //   [1] A function to UPDATE that state value
  //
  // We use "array destructuring" to give them meaningful names:
  //   const [currentValue, setterFunction] = useState(initialValue);
  //
  // When you call the setter function (e.g., setFormData), React:
  //   1. Updates the state value
  //   2. Re-renders the component with the new value
  //   3. The UI automatically reflects the change
  //
  // This is what makes React "reactive" — state changes → automatic UI updates!
  // ========================================================================

  /**
   * formData — an OBJECT that holds all our form field values
   *
   * Why use ONE object instead of separate useState for each field?
   * → It keeps related data together and makes it easier to reset all fields
   *   at once. Both approaches are valid, this is a common pattern for forms.
   *
   * Initial value: all fields start as empty strings ''
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  /**
   * isSubmitting — a BOOLEAN that tracks whether the form is being submitted
   *
   * We use this to:
   * - Show "Sending..." text on the button while submitting
   * - Disable the button to prevent double-submissions
   * - Give the user visual feedback that something is happening
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================
  //
  // Event handlers are functions that run when something happens (an "event").
  // Common events: onClick, onChange, onSubmit, onMouseEnter, etc.
  //
  // In React, we pass functions as event handlers (not strings like in HTML).
  // HTML:  <button onclick="handleClick()">        ← string (old way)
  // React: <button onClick={handleClick}>          ← function reference
  //
  // Notice: React uses camelCase (onClick, onChange) not lowercase (onclick)
  // ========================================================================

  /**
   * handleChange — runs every time the user types in ANY form input
   *
   * @param {Event} e — The synthetic event object provided by React
   *
   * HOW IT WORKS (step by step):
   *
   * 1. User types a letter in the "Name" input
   * 2. React fires the onChange event
   * 3. This function receives the event object 'e'
   * 4. e.target refers to the DOM element that triggered the event (the input)
   * 5. e.target.name is the input's "name" attribute (e.g., "name", "email")
   * 6. e.target.value is whatever the user has typed so far
   *
   * COMPUTED PROPERTY NAMES — The Magic of [e.target.name]:
   *
   * Consider this object: { [e.target.name]: e.target.value }
   *
   * If the user is typing in the email field:
   *   e.target.name  = "email"
   *   e.target.value = "hello@example.com"
   *   Result: { email: "hello@example.com" }
   *
   * If the user is typing in the name field:
   *   e.target.name  = "name"
   *   e.target.value = "John"
   *   Result: { name: "John" }
   *
   * This means ONE function handles ALL inputs! Without computed property
   * names, we'd need separate handleNameChange, handleEmailChange, etc.
   *
   * SPREAD OPERATOR — Why { ...formData, [e.target.name]: e.target.value }?
   *
   * We NEVER mutate state directly in React. Instead of doing:
   *   formData.name = "John"  ← ❌ WRONG! Direct mutation
   *
   * We create a NEW object with all the old values PLUS the updated one:
   *   { ...formData, [e.target.name]: e.target.value }  ← ✅ CORRECT!
   *
   * The spread (...formData) copies ALL existing properties,
   * then [e.target.name]: e.target.value OVERWRITES just the one that changed.
   *
   * Example: If formData = { name: "John", email: "", subject: "", message: "" }
   * and the user types "Hi" in the subject field:
   * → { ...formData, subject: "Hi" }
   * → { name: "John", email: "", subject: "Hi", message: "" }
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * handleSubmit — runs when the user submits the form
   *
   * @param {Event} e — The form submission event
   *
   * IMPORTANT CONCEPTS:
   *
   * e.preventDefault():
   *   By default, HTML forms RELOAD the page when submitted.
   *   In a React SPA (Single Page Application), we DON'T want that!
   *   preventDefault() stops the browser's default form submission behavior
   *   so we can handle it ourselves with JavaScript.
   *
   * setTimeout():
   *   This is a built-in JavaScript function that runs code after a delay.
   *   setTimeout(callback, milliseconds)
   *   Here we use it to SIMULATE a network request (like sending data to a server).
   *   In a real app, you'd replace this with fetch() or axios to send data
   *   to your backend API.
   *
   * Why reset the form?
   *   After successful submission, we clear all fields by setting formData
   *   back to its initial state (all empty strings). This gives the user
   *   a clear signal that their message was sent successfully.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate standard frontend submission delay
    setTimeout(() => {
      alert('Message sent successfully! Thank you for reaching out. 🎉');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 800);
  };

  // ========================================================================
  // CONTACT INFO DATA
  // ========================================================================
  //
  // We define our contact details as an array of objects.
  // This is a common pattern called "data-driven rendering" — instead of
  // hard-coding each card in JSX, we define the data and use .map() to
  // render them. This makes the code DRY (Don't Repeat Yourself) and
  // easy to update — just change the data, not the JSX structure!
  // ========================================================================
  const contactDetails = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'priyanshukumar6908@gmail.com',
      gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'India',
      gradient: 'linear-gradient(135deg, #ec4899, #f472b6)',
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: 'Available on request',
      gradient: 'linear-gradient(135deg, #f97316, #fb923c)',
    },
  ];

  // ========================================================================
  // JSX RETURN — What the component renders
  // ========================================================================
  //
  // JSX Rules to Remember:
  // 1. Use className instead of class (class is reserved in JavaScript)
  // 2. Use camelCase for event handlers (onClick, onChange, onSubmit)
  // 3. Use curly braces {} to embed JavaScript expressions
  // 4. Self-closing tags must end with /> (e.g., <input />, <br />)
  // 5. You can only return ONE root element (we return one <section>)
  // ========================================================================
  return (
    <section id="contact" className="section contact">
      <div className="container">
        {/* ================================================================
            SECTION HEADER
            ================================================================
            motion.div — This is a regular <div> enhanced by Framer Motion.
            It can accept animation props that a normal div cannot.

            Animation Props Explained:
            - initial: The starting state BEFORE the animation plays
            - whileInView: The state to animate TO when the element
              scrolls into the viewport (becomes visible on screen)
            - viewport: Configuration for when the animation triggers
              - once: true → animate only the FIRST time it's visible
                (if false, it would re-animate every time you scroll past)
            - transition: Controls HOW the animation plays
              - duration: how long in seconds
              - ease: the acceleration curve ("easeOut" = starts fast, ends slow)
            ================================================================ */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        {/* ================================================================
            CONTACT GRID — Two-column layout
            ================================================================
            CSS Grid splits this into two equal columns on desktop.
            On mobile (≤768px), it stacks into a single column.
            ================================================================ */}
        <div className="contact-grid">
          {/* ==============================================================
              LEFT COLUMN — Contact Information
              ==============================================================
              staggerChildren: When a parent has multiple animated children,
              staggerChildren adds a DELAY between each child's animation.
              0.1 means each child starts 0.1 seconds after the previous one.
              This creates a nice cascading/waterfall effect!
              ============================================================== */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h3 className="contact-heading">
              Let's work together
            </h3>
            <p className="contact-text">
              I'm currently open to new opportunities and exciting projects.
              Whether you have a question, a proposal, or just want to say hello,
              feel free to reach out. I'll do my best to get back to you as soon as possible!
            </p>

            {/* ==============================================================
                CONTACT DETAILS CARDS — Rendered using .map()
                ==============================================================
                Array.map() is THE most important method in React!
                It transforms an array of DATA into an array of JSX ELEMENTS.

                contactDetails.map((detail, index) => { ... })
                  - detail: the current item in the array (an object)
                  - index: the position (0, 1, 2, ...)

                KEY PROP — Why key={index}?
                React needs a unique "key" for each element in a list.
                Keys help React efficiently update the DOM by identifying
                which items changed, were added, or were removed.
                In production, use a unique ID instead of index when possible.

                INLINE STYLES — style={{ background: detail.gradient }}
                In JSX, the style attribute takes a JavaScript OBJECT, not a string.
                Notice the DOUBLE curly braces:
                  - Outer {} = "I'm embedding JavaScript in JSX"
                  - Inner {} = "This is a JavaScript object literal"
                ============================================================== */}
            {contactDetails.map((detail, index) => (
              <motion.div
                className="contact-info-card"
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="contact-info-icon"
                  style={{ background: detail.gradient }}
                >
                  {detail.icon}
                </div>
                <div>
                  <div className="contact-info-label">{detail.label}</div>
                  <div className="contact-info-value">{detail.value}</div>
                </div>
              </motion.div>
            ))}

            {/* ==============================================================
                SOCIAL LINKS
                ==============================================================
                target="_blank" — Opens the link in a new browser tab
                rel="noopener noreferrer" — Security best practice when using
                target="_blank". Prevents the new page from accessing our
                window object (noopener) and hides the referrer URL (noreferrer).
                ============================================================== */}
            <div className="contact-socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Twitter Profile"
              >
                <FaTwitter />
              </a>
            </div>
          </motion.div>

          {/* ==============================================================
              RIGHT COLUMN — Contact Form
              ==============================================================
              This is where we put CONTROLLED COMPONENTS into practice!

              A controlled component flow:
              1. User types → onChange fires → handleChange runs
              2. handleChange updates state via setFormData
              3. React re-renders the component
              4. The input's value prop reflects the new state
              5. The input displays the updated value

              This creates a "single source of truth" — the React state
              is ALWAYS the authoritative source of the form data.
              The input just REFLECTS what's in state.

              Why controlled components?
              - You can validate input in real-time
              - You can transform input (e.g., uppercase)
              - You always know the exact form data
              - You can easily reset the form
              - You can conditionally disable the submit button
              ============================================================== */}
          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* ==============================================================
                FORM ELEMENT
                ==============================================================
                onSubmit={handleSubmit}
                  When the user clicks the submit button (or presses Enter),
                  the form's onSubmit event fires and calls our handleSubmit
                  function. We pass the FUNCTION REFERENCE (handleSubmit),
                  NOT the function CALL (handleSubmit()).

                  handleSubmit   → "Here's the function, call it when needed" ✅
                  handleSubmit() → "Call this function RIGHT NOW" ❌
                  (The second would run immediately when the component renders!)
                ============================================================== */}
            <form onSubmit={handleSubmit}>
              {/* ============================================================
                  FORM GROUP — Name Input
                  ============================================================
                  Breaking down the input props:

                  type="text"
                    → Standard text input field

                  name="name"
                    → This is the KEY that handleChange uses!
                      When this input changes, e.target.name will be "name",
                      so setFormData({ ...formData, name: e.target.value })

                  value={formData.name}
                    → This makes it a CONTROLLED component.
                      The input always shows what's in formData.name.
                      Without this, it would be an "uncontrolled" component.

                  onChange={handleChange}
                    → Fires every keystroke. Calls our shared handler.

                  placeholder="Your Name"
                    → Ghost text shown when the input is empty.

                  required
                    → HTML5 validation. Browser won't submit if empty.
                    → In React, writing just "required" is the same as
                      required={true} (boolean shorthand).
                  ============================================================ */}
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="form-input"
                  required
                />
              </div>

              {/* ============================================================
                  FORM GROUP — Email Input
                  ============================================================
                  type="email" gives us FREE browser validation!
                  The browser will check that the input looks like an email
                  (contains @ and a domain) before allowing form submission.
                  ============================================================ */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="form-input"
                  required
                />
              </div>

              {/* ============================================================
                  FORM GROUP — Subject Input
                  ============================================================ */}
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="form-input"
                  required
                />
              </div>

              {/* ============================================================
                  FORM GROUP — Message Textarea
                  ============================================================
                  <textarea> in React uses value prop instead of children.
                  In HTML: <textarea>default text</textarea>
                  In React: <textarea value={state} />

                  rows={5} — Sets the visible height (5 lines of text).
                  The CSS also sets min-height and resize: vertical so users
                  can drag to make it taller but not wider.
                  ============================================================ */}
              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="form-textarea"
                  rows={5}
                  required
                />
              </div>

              {/* ============================================================
                  SUBMIT BUTTON
                  ============================================================
                  disabled={isSubmitting}
                    → When isSubmitting is true, the button becomes
                      unclickable. This prevents double-submissions!

                  CONDITIONAL RENDERING with Ternary Operator:
                    {isSubmitting ? 'Sending...' : 'Send Message'}

                  This is a JavaScript ternary: condition ? ifTrue : ifFalse
                  - If isSubmitting is true → show 'Sending...'
                  - If isSubmitting is false → show 'Send Message'

                  This is one of the MOST common patterns in React for
                  showing different content based on state!
                  ============================================================ */}
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * EXPORT — Making this component available to other files
 *
 * "export default" means this is the MAIN export of this file.
 * Other files can import it like:
 *   import Contact from './components/Contact';
 *
 * You can only have ONE default export per file.
 * Named exports (export const something) can have multiple per file.
 */
export default Contact;
