import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Databases',
    skills: ['SQL', 'PostgreSQL'],
  },
  {
    category: 'Languages & Tools',
    skills: ['C++', 'Python', 'Git', 'GitHub'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="section-header"
        >
          <span className="section-label">02 / Skills</span>
          <h2 className="section-title">Technical Stack</h2>
          <p className="section-subtitle">
            Core languages, frontend technologies, and database tools I use in coursework and projects.
          </p>
        </motion.div>

        <div className="skills-rows">
          {skillsData.map((categoryData) => (
            <div key={categoryData.category} className="skills-row">
              <h3 className="skills-category-name">{categoryData.category}</h3>
              <ul className="skills-list">
                {categoryData.skills.map((skill) => (
                  <li key={skill} className="skill-pill">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
