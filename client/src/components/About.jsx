import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const profileFacts = [
  { label: 'Degree', value: 'B.Tech Computer Science & Engineering' },
  { label: 'Current Standing', value: '5th Semester · CGPA 8.25' },
  { label: 'Primary Stack', value: 'React.js, JavaScript, SQL / PostgreSQL' },
  { label: 'Location', value: 'India' },
];

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="section-header"
        >
          <span className="section-label">01 / About</span>
          <h2 className="section-title">Background &amp; Focus</h2>
        </motion.div>

        <div className="about-layout">
          <div className="about-prose">
            <p className="about-text">
              I am a 5th-semester B.Tech Computer Science and Engineering student with a CGPA of 8.25, focused on frontend web development using React.js, JavaScript, HTML5, and CSS3.
            </p>
            <p className="about-text">
              My coursework and project work center on building structured client-side interfaces, managing component state, and working with relational databases in SQL and PostgreSQL. I also collaborate on cross-disciplinary university projects and hackathon prototypes.
            </p>
          </div>

          <dl className="about-facts">
            {profileFacts.map((fact) => (
              <div key={fact.label} className="about-fact-row">
                <dt className="about-fact-label">{fact.label}</dt>
                <dd className="about-fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
