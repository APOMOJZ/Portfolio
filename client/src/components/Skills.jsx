/**
 * =============================================================================
 * 📘 SKILLS COMPONENT — Showcasing Your Technical Skills
 * =============================================================================
 *
 * This component teaches several important React & JavaScript concepts:
 *
 * 1. NESTED DATA STRUCTURES & NESTED .map():
 *    Our skills data is organized as an array of categories, where each
 *    category contains its own array of skills. To render this, we need
 *    NESTED .map() calls — one for categories, one for skills within each.
 *    This is like a nested for-loop but in a declarative, React-friendly way.
 *
 * 2. DATA-DRIVEN UI:
 *    All the skill information (icons, names, levels, colors) is defined in
 *    a single data array. The component reads this data and generates the UI
 *    automatically. Want to add a new skill? Just add an object to the array!
 *    No need to touch the JSX structure at all.
 *
 * 3. PROGRESS BAR ANIMATION:
 *    Each skill has a proficiency level (0–100). We visualize this with a
 *    colored bar that animates its width from 0% to the target percentage
 *    when the element scrolls into view. Framer Motion's whileInView prop
 *    makes this incredibly easy.
 *
 * 4. STAGGERED ANIMATIONS:
 *    Instead of all cards appearing at once, each card appears slightly after
 *    the previous one. We achieve this by multiplying a delay value by the
 *    card's index: delay: 0.1 * index. This creates a cascading "wave" effect.
 *
 * 5. ICONS AS REACT COMPONENTS:
 *    In React, icons from libraries like react-icons are just components.
 *    You can pass them around as props, store them in variables, and render
 *    them like any other component: <Icon />. Under the hood, they're SVG
 *    elements wrapped in a React component.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// 📦 IMPORTS
// -----------------------------------------------------------------------------

import React from 'react';

/**
 * Framer Motion's motion object provides animated versions of HTML elements.
 * motion.div = an animated <div>
 * motion.span = an animated <span>
 * We use them to add entrance animations and progress bar animations.
 */
import { motion } from 'framer-motion';

/**
 * REACT ICONS — Importing Icons as Components
 *
 * react-icons is organized by icon library:
 * - 'react-icons/fa'  → Font Awesome icons (prefix: Fa)
 * - 'react-icons/si'  → Simple Icons / brand icons (prefix: Si)
 *
 * Each icon is a React component that renders an SVG.
 * You use them just like any other component: <FaReact />
 *
 * The naming convention follows the icon name:
 * - FaReact     → Font Awesome + "React"
 * - FaJs        → Font Awesome + "Js" (JavaScript)
 * - SiExpress   → Simple Icons + "Express"
 * - SiMongodb   → Simple Icons + "Mongodb"
 */
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaFigma,
} from 'react-icons/fa';

import { SiExpress, SiMongodb } from 'react-icons/si';

/**
 * Component-specific styles. Keeping CSS files co-located with their
 * components is a common pattern in React projects. It makes it easy
 * to find and edit styles for a specific component.
 */
import './Skills.css';

// -----------------------------------------------------------------------------
// 📊 SKILLS DATA — The Single Source of Truth
// -----------------------------------------------------------------------------

/**
 * DATA-DRIVEN UI EXPLAINED:
 *
 * This array is the "single source of truth" for all skill information.
 * The component below reads this data and generates all the UI elements.
 *
 * STRUCTURE (Nested Arrays):
 * skillsData = [
 *   {
 *     category: "Frontend",           ← Category name
 *     skills: [                        ← Array of skills in this category
 *       {
 *         name: "React",              ← Display name
 *         icon: FaReact,              ← Icon COMPONENT (not a string!)
 *         level: 85,                  ← Proficiency: 0-100
 *         color: '#61dafb'            ← Brand color for the icon & bar
 *       },
 *       ...more skills
 *     ]
 *   },
 *   ...more categories
 * ]
 *
 * IMPORTANT: Notice that 'icon' stores a React COMPONENT (like FaReact),
 * not a string. In JavaScript, functions (and React components ARE functions)
 * are "first-class citizens" — you can store them in variables, pass them
 * as arguments, and put them in arrays/objects just like any other value.
 */
const skillsData = [
  {
    category: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: FaReact,
        level: 85,
        color: '#61dafb',
      },
      {
        name: 'JavaScript',
        icon: FaJs,
        level: 80,
        color: '#f7df1e',
      },
      {
        name: 'HTML5',
        icon: FaHtml5,
        level: 90,
        color: '#e34f26',
      },
      {
        name: 'CSS3',
        icon: FaCss3Alt,
        level: 85,
        color: '#1572b6',
      },
    ],
  },
  {
    category: 'Backend (Planned Roadmap)',
    skills: [
      {
        name: 'Node.js',
        icon: FaNodeJs,
        level: 0,
        color: '#339933',
      },
      {
        name: 'Express',
        icon: SiExpress,
        level: 0,
        color: '#ffffff',
      },
      {
        name: 'MongoDB',
        icon: SiMongodb,
        level: 0,
        color: '#47a248',
      },
    ],
  },
  {
    category: 'Tools',
    skills: [
      {
        name: 'Git',
        icon: FaGitAlt,
        level: 80,
        color: '#f05032',
      },
      {
        name: 'Docker',
        icon: FaDocker,
        level: 50,
        color: '#2496ed',
      },
      {
        name: 'Figma',
        icon: FaFigma,
        level: 60,
        color: '#f24e1e',
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// 🏠 SKILLS COMPONENT — The Main Export
// -----------------------------------------------------------------------------

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        {/* ----------------------------------------------------------------
         * SECTION HEADER
         * Same pattern as the About component — a title with gradient text
         * and a subtitle, both animated on scroll.
         * ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="gradient-text">My Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* ----------------------------------------------------------------
         * OUTER .map() — Iterating Over Categories
         *
         * .map() is an array method that transforms each element in an
         * array. It takes a callback function that receives:
         * - item: The current element (here, a category object)
         * - index: The position in the array (0, 1, 2, ...)
         *
         * For each category, we return a section with the category name
         * and a grid of skill cards.
         *
         * WHY .map() INSTEAD OF forEach()?
         * - .map() RETURNS a new array (of JSX elements) — React needs this
         * - .forEach() returns undefined — React can't render that
         *
         * KEY PROP:
         * Every element in a .map() must have a unique "key" prop.
         * React uses keys to efficiently determine which items changed,
         * were added, or removed. We use the category name as the key
         * since each category name is unique.
         * ---------------------------------------------------------------- */}
        {skillsData.map((categoryData, categoryIndex) => (
          <motion.div
            key={categoryData.category}
            className="skills-category"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
          >
            {/* Category Title with a decorative gradient line */}
            <h3 className="category-title">
              <span>{categoryData.category}</span>
              <span className="category-line" />
            </h3>

            {/* ============================================================
             * INNER .map() — Iterating Over Skills Within a Category
             *
             * This is the NESTED .map() — for each category, we now
             * iterate over its skills array. This is conceptually the
             * same as a nested for-loop:
             *
             * for (let cat of categories) {
             *   for (let skill of cat.skills) {
             *     renderCard(skill);
             *   }
             * }
             *
             * But in React, we use .map() because it returns JSX that
             * React can render.
             * ============================================================ */}
            <div className="skills-grid">
              {categoryData.skills.map((skill, skillIndex) => {
                /**
                 * DYNAMIC COMPONENT RENDERING:
                 *
                 * skill.icon holds a React component (like FaReact).
                 * To render a component stored in a variable, the variable
                 * name MUST start with an uppercase letter. This tells
                 * React "this is a component, not an HTML element."
                 *
                 * So we write: const Icon = skill.icon;
                 * Then use it: <Icon />
                 *
                 * If we wrote: const icon = skill.icon; (lowercase)
                 * And used: <icon /> — React would try to create an HTML
                 * element called "icon" instead of rendering the component!
                 */
                const Icon = skill.icon;

                return (
                  <motion.div
                    key={skill.name}
                    className="skill-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      /**
                       * STAGGER EFFECT:
                       * delay: skillIndex * 0.1 means:
                       * - Card 0: 0s delay
                       * - Card 1: 0.1s delay
                       * - Card 2: 0.2s delay
                       * - Card 3: 0.3s delay
                       * This creates a wave/cascade animation!
                       */
                      delay: skillIndex * 0.1,
                    }}
                  >
                    {/* Skill Icon — colored with the brand color */}
                    <div className="skill-icon" style={{ color: skill.color }}>
                      <Icon />
                    </div>

                    {/* Skill Name */}
                    <p className="skill-name">{skill.name}</p>

                    {/* ====================================================
                     * PROGRESS BAR — Animated Width
                     *
                     * The progress bar has two layers:
                     * 1. .skill-bar-bg: The gray background (full width)
                     * 2. .skill-bar-fill: The colored fill (animated width)
                     *
                     * FRAMER MOTION ANIMATION:
                     * - initial={{ width: '0%' }}: Bar starts at 0% width
                     * - whileInView={{ width: `${skill.level}%` }}:
                     *   When visible, animates to the skill's level
                     *   Template literal `${skill.level}%` converts the
                     *   number 85 to the string "85%"
                     *
                     * - transition.duration: 1 second for smooth fill
                     * - transition.delay: Small delay after card appears
                     *
                     * INLINE STYLES:
                     * style={{ background: skill.color }} sets each bar
                     * to the skill's brand color. This is an example of
                     * "inline styles" in React — useful when the style
                     * is dynamic (depends on data).
                     * ==================================================== */}
                    <div className="skill-bar-bg">
                      <motion.div
                        className="skill-bar-fill"
                        style={{ background: skill.color }}
                        initial={{ width: '0%' }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.3 + skillIndex * 0.1,
                          ease: 'easeOut',
                        }}
                      />
                    </div>

                    {/* Skill Level Percentage */}
                    <span className="skill-level">{skill.level}%</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// 📤 EXPORT
// -----------------------------------------------------------------------------

/**
 * We export Skills as the default export so it can be imported in App.jsx:
 * import Skills from './components/Skills';
 *
 * And then used in JSX like any HTML element:
 * <Skills />
 */
export default Skills;
