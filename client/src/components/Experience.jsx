/**
 * ============================================================
 * 📂 Experience.jsx - My Journey / Timeline Section
 * ============================================================
 *
 * This component displays a vertical timeline showing your
 * learning journey. Cards alternate left and right, connected
 * by a gradient line with glowing dots.
 *
 * 🎓 KEY CONCEPTS YOU'LL LEARN:
 * 1. Array .map() with index - using the index parameter
 * 2. Modulo operator (%) - alternating left/right placement
 * 3. Conditional class names - dynamic CSS classes
 * 4. whileInView animation - scroll-triggered animations
 * 5. Timeline UI pattern - common web design layout
 *
 * Think of this like a physical timeline you'd see in a museum,
 * but vertical, with cards popping in as you scroll down.
 * ============================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

/**
 * 🎓 TIMELINE DATA
 * ------------------
 * Each entry represents a milestone in your journey.
 *
 * Properties:
 * - year: when it happened (shown in a badge)
 * - title: the main heading
 * - subtitle: a secondary description
 * - description: detailed text about this milestone
 * - icon: an emoji to visually represent the milestone
 *
 * The ARRAY ORDER matters here because we render them top to
 * bottom. The first item appears at the top of the timeline.
 */
const timelineData = [
  {
    year: '2023',
    title: 'Started Learning Programming',
    subtitle: 'Self-taught Journey',
    description:
      'Discovered the world of coding and fell in love with the idea of building things from scratch. Started with basic programming concepts and logic.',
    icon: '🚀',
  },
  {
    year: '2023',
    title: 'HTML, CSS & JavaScript',
    subtitle: 'Web Fundamentals',
    description:
      'Built my first static websites and learned DOM manipulation. Understanding how the web works was a game-changer for my learning path.',
    icon: '🌐',
  },
  {
    year: '2024',
    title: 'React & Frontend Development',
    subtitle: 'Frontend Deep Dive',
    description:
      'Learned component-based architecture and modern UI development. React changed the way I think about building user interfaces.',
    icon: '⚛️',
  },
  {
    year: 'Roadmap',
    title: 'Node.js & Express (Planned)',
    subtitle: 'Backend Roadmap',
    description:
      'My next planned learning milestone. I look forward to building REST APIs, server architecture, and environment configuration.',
    icon: '⏳',
  },
  {
    year: 'Roadmap',
    title: 'MongoDB & Databases (Planned)',
    subtitle: 'Database Roadmap',
    description:
      'Planned learning for relational and document-based databases. I will integrate persistence with my React front-end skills.',
    icon: '⏳',
  },
  {
    year: '2025',
    title: 'Interactive React Projects',
    subtitle: 'Present',
    description:
      'Designing and developing fully functional React frontend applications, utilizing localStorage persistence and custom styling.',
    icon: '⚛️',
  },
];

/**
 * 🎓 THE EXPERIENCE COMPONENT
 * =============================
 * This renders a vertical timeline with cards that alternate
 * between left and right sides.
 */
const Experience = () => {
  return (
    <section
      id="experience"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
      // 🎓 We use an inline style here to give this section a
      // different background color. This makes it visually distinct
      // from the sections above and below it, creating a nice
      // rhythm as the user scrolls through the page.
    >
      <div className="container">
        {/* ---- Section Header ---- */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            From curious beginner to aspiring full-stack developer — here&apos;s
            how my coding journey has unfolded so far.
          </p>
        </motion.div>

        {/* ---- Timeline Container ---- */}
        {/*
          🎓 The timeline structure:
          - The vertical line is created with CSS ::before pseudo-element
          - Each item is positioned on alternating sides
          - A dot connects each card to the center line
        */}
        <div className="timeline">
          {timelineData.map((item, index) => (
            /**
             * 🎓 .map() with INDEX PARAMETER
             * --------------------------------
             * .map() gives us TWO arguments:
             *   1. item  - the current array element
             *   2. index - its position (0, 1, 2, 3, ...)
             *
             * We use the index to determine if a card should be
             * on the LEFT or RIGHT side of the timeline.
             *
             * 🎓 THE MODULO OPERATOR (%)
             * ----------------------------
             * index % 2 gives the REMAINDER when dividing by 2:
             *   0 % 2 = 0  → LEFT  (even)
             *   1 % 2 = 1  → RIGHT (odd)
             *   2 % 2 = 0  → LEFT  (even)
             *   3 % 2 = 1  → RIGHT (odd)
             *   ...and so on
             *
             * So `index % 2 !== 0` is true for odd numbers (1, 3, 5)
             * and false for even numbers (0, 2, 4).
             * This creates the alternating left-right pattern!
             *
             * This is one of the most useful tricks in programming.
             * You'll see it everywhere: alternating row colors,
             * zig-zag layouts, even/odd logic, etc.
             */
            <motion.div
              key={index}
              className={`timeline-item ${index % 2 !== 0 ? 'right' : ''}`}
              // 🎓 Conditional class: if index is odd, add 'right' class.
              // Template literal: `timeline-item ${condition ? 'right' : ''}`
              // - Even index (0,2,4): className="timeline-item"     → left side
              // - Odd index (1,3,5):  className="timeline-item right" → right side
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                // 🎓 Cards slide in from their respective sides:
                // - Left cards (even): start at x: -60 (60px to the LEFT)
                // - Right cards (odd): start at x: 60 (60px to the RIGHT)
                // Then they animate to x: 0 (their final position)
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                // 🎓 delay: index * 0.15 creates a staggered effect:
                //   Card 0: 0.00s delay
                //   Card 1: 0.15s delay
                //   Card 2: 0.30s delay
                //   Card 3: 0.45s delay
                // This makes cards appear one by one as you scroll,
                // creating a cascading reveal effect.
                ease: 'easeOut',
              }}
            >
              {/* -- Timeline Dot --
                The small glowing circle that connects the card
                to the vertical timeline line. Positioned with CSS.
              */}
              <div className="timeline-dot" />

              {/* -- Timeline Card Content -- */}
              <div className="timeline-card">
                {/* Year Badge */}
                <span className="timeline-year">
                  {item.icon} {item.year}
                </span>

                {/* Title */}
                <h3 className="timeline-title">{item.title}</h3>

                {/* Subtitle */}
                <p className="timeline-subtitle">{item.subtitle}</p>

                {/* Description */}
                <p className="timeline-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
