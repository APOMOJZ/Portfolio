import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const timelineData = [
  {
    year: '2026',
    label: 'Hackathon',
    title: 'Noor Hackathon 2026 Finalist',
    subtitle: "Women's Safety Web Prototype",
    description:
      'Built a web prototype that scores locality safety based on time of day to help users assess route and neighborhood conditions.',
  },
  {
    year: '2026',
    label: 'Hackathon',
    title: 'Smart India Hackathon 2026 Internal Round Qualifier',
    subtitle: 'AI Bid Compliance Platform',
    description:
      'Qualified in the internal round with a team prototype for checking bid documents against compliance requirements.',
  },
  {
    year: '2024 — Present',
    label: 'Education',
    title: 'B.Tech in Computer Science & Engineering',
    subtitle: '5th Semester · CGPA: 8.25',
    description:
      'Focused on frontend development with React.js and JavaScript alongside relational database coursework in SQL and PostgreSQL.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="section-label">04 / Achievements &amp; Education</span>
          <h2 className="section-title">Hackathons &amp; Academic Standing</h2>
          <p className="section-subtitle">
            Competition milestones and current undergraduate coursework.
          </p>
        </motion.div>

        <div className="timeline-list">
          {timelineData.map((item) => (
            <div key={item.title} className="timeline-row">
              <div className="timeline-meta">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-tag">{item.label}</span>
              </div>

              <div className="timeline-body">
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-subtitle">{item.subtitle}</p>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
