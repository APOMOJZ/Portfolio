import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
  {
    id: 1,
    title: 'Food Toxicants Dashboard',
    context: 'Interdepartmental CSE × Biotech Team Project',
    description:
      'Collaborative web dashboard built with an interdepartmental CSE and Biotech team to organize, filter, and review food toxicant records.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Team Project'],
    category: 'web',
    github: '',
    live: 'https://git4tanishk.github.io/FoodToxicant-Dashboard/',
  },
  {
    id: 2,
    title: 'FreeClass',
    context: 'Classroom Availability Tracker',
    description:
      'Web tool that tracks classroom schedules to show open rooms across campus time slots for students and faculty.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Scheduling'],
    category: 'web',
    github: 'https://github.com/APOMOJZ/freeclass',
    live: 'https://apomojz.github.io/freeclass/',
  },
  {
    id: 101,
    title: 'Interactive Kanban Board',
    context: 'Built-in React Module',
    description:
      'Client-side task board with four workflow columns, priority labels, search filtering, and browser localStorage persistence.',
    tags: ['React.js', 'JavaScript', 'localStorage', 'CSS Grid'],
    category: 'react',
    github: '',
    live: '/project/kanban',
  },
  {
    id: 102,
    title: 'Financial Expense Tracker',
    context: 'Built-in React Module',
    description:
      'Client-side income and expense ledger with a monthly budget gauge, category totals, transaction filters, and localStorage persistence.',
    tags: ['React.js', 'JavaScript', 'SVG', 'localStorage'],
    category: 'react',
    github: '',
    live: '/project/expense-tracker',
  },
];

const filterCategories = [
  { label: 'All', value: 'All' },
  { label: 'Web Apps', value: 'web' },
  { label: 'React Modules', value: 'react' },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <span className="section-label">03 / Projects</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            Deployed team projects and interactive React modules running directly inside this portfolio.
          </p>
        </motion.div>

        <div className="filter-buttons" role="tablist" aria-label="Filter projects">
          {filterCategories.map((category) => (
            <button
              key={category.value}
              type="button"
              className={`filter-btn ${
                activeFilter === category.value ? 'active' : ''
              }`}
              onClick={() => setActiveFilter(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-list">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="project-row"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="project-row-meta">
                  <span className="project-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-context">{project.context}</span>
                </div>

                <div className="project-row-main">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-links">
                  {project.live.startsWith('/') ? (
                    <Link to={project.live} className="project-link project-link-primary">
                      <span>Open App</span>
                      <FaExternalLinkAlt />
                    </Link>
                  ) : (
                    <a
                      href={project.live}
                      className="project-link project-link-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live</span>
                      <FaExternalLinkAlt />
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub />
                      <span>Repo</span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;
