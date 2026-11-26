import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
  FaChevronRight,
  FaChevronLeft,
  FaSearch,
  FaUndo,
  FaExclamationCircle,
} from 'react-icons/fa';
import './KanbanProject.css';

const DEFAULT_TASKS = [
  {
    id: 'kanban-1',
    title: 'Refine Portfolio Typography & Layout',
    description: 'Apply Instrument Serif headings, warm paper surface tokens, and hairline borders.',
    priority: 'High',
    category: 'Design',
    status: 'done',
  },
  {
    id: 'kanban-2',
    title: 'Implement Interactive Kanban Board',
    description: 'Build a client-side Kanban board utilizing localStorage for state persistence.',
    priority: 'High',
    category: 'Feature',
    status: 'in_progress',
  },
  {
    id: 'kanban-3',
    title: 'Build Expense Tracker App',
    description: 'Create an expense dashboard with an SVG budget gauge and transaction logging.',
    priority: 'Medium',
    category: 'Feature',
    status: 'todo',
  },
  {
    id: 'kanban-4',
    title: 'Verify Responsive Breakpoints',
    description: 'Check grid stacking and spacing across mobile and desktop viewports.',
    priority: 'Low',
    category: 'Refactor',
    status: 'review',
  },
];

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: '#5C5C5C' },
  { id: 'in_progress', title: 'In Progress', color: '#1D4ED8' },
  { id: 'review', title: 'In Review', color: '#92400E' },
  { id: 'done', title: 'Completed', color: '#1B4332' },
];

function KanbanProject() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('portfolio_kanban_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Feature',
    status: 'todo',
  });

  useEffect(() => {
    localStorage.setItem('portfolio_kanban_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      category: formData.category,
      status: formData.status,
    };

    setTasks((prev) => [newTask, ...prev]);
    resetForm();
  };

  const handleStartEdit = (task) => {
    setEditingTask(task.id);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      status: task.status,
    });
    setShowAddForm(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask ? { ...task, ...formData } : task
      )
    );
    resetForm();
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, direction) => {
    const statusOrder = ['todo', 'in_progress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const currentIndex = statusOrder.indexOf(task.status);
          const nextIndex = currentIndex + direction;
          if (nextIndex >= 0 && nextIndex < statusOrder.length) {
            return { ...task, status: statusOrder[nextIndex] };
          }
        }
        return task;
      })
    );
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      category: 'Feature',
      status: 'todo',
    });
    setEditingTask(null);
    setShowAddForm(false);
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all tasks to the default samples?')) {
      setTasks(DEFAULT_TASKS);
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#991B1B';
      case 'Medium':
        return '#92400E';
      case 'Low':
        return '#1B4332';
      default:
        return '#5C5C5C';
    }
  };

  return (
    <div className="kanban-page">
      <div className="kanban-container">
        <header className="kanban-header">
          <div className="subpage-nav-row">
            <Link to="/" className="back-link">
              <FaArrowLeft /> Back to Portfolio
            </Link>
            <nav className="subpage-tabs" aria-label="React Modules">
              <Link to="/project/kanban" className="subpage-tab active">
                Kanban Board
              </Link>
              <Link to="/project/expense-tracker" className="subpage-tab">
                Expense Tracker
              </Link>
            </nav>
          </div>
          <div className="header-title-area">
            <h1>Interactive Kanban Board</h1>
            <p>
              Organize, prioritize, and move tasks across columns with browser localStorage persistence.
            </p>
          </div>
        </header>

        <div className="kanban-toolbar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks, descriptions, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="btn btn-primary action-btn"
            >
              <FaPlus /> Add Task
            </button>
            <button
              onClick={resetToDefault}
              className="btn btn-outline reset-btn"
              title="Reset Board to Default Samples"
            >
              <FaUndo /> Reset
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              className="form-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
            >
              <motion.div
                className="form-drawer-content"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="drawer-header">
                  <h3>{editingTask ? 'Edit Task Details' : 'Create New Board Task'}</h3>
                  <button className="close-drawer-btn" onClick={resetForm} aria-label="Close">
                    &times;
                  </button>
                </div>

                <form
                  onSubmit={editingTask ? handleSaveEdit : handleAddTask}
                  className="drawer-form"
                >
                  <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Build filter controls"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Provide details about this task..."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group half-width">
                      <label htmlFor="priority">Priority</label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div className="form-group half-width">
                      <label htmlFor="category">Category Tag</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="e.g. Design, Feature, Bug"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Initial Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">In Review</option>
                      <option value="done">Completed</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-primary submit-btn">
                      {editingTask ? 'Save Changes' : 'Add Task'}
                    </button>
                    <button type="button" onClick={resetForm} className="btn btn-outline cancel-btn">
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="kanban-grid">
          {COLUMNS.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="kanban-column">
                <div className="column-header" style={{ borderTopColor: col.color }}>
                  <div className="column-title-wrapper">
                    <span
                      className="column-indicator-dot"
                      style={{ backgroundColor: col.color }}
                    />
                    <h4>{col.title}</h4>
                  </div>
                  <span className="column-count-badge">{colTasks.length}</span>
                </div>

                <div className="column-body">
                  <AnimatePresence mode="popLayout">
                    {colTasks.length > 0 ? (
                      colTasks.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="kanban-task-card"
                        >
                          <div className="task-card-header">
                            <span
                              className="priority-pill"
                              style={{
                                color: getPriorityColor(task.priority),
                                borderColor: getPriorityColor(task.priority),
                              }}
                            >
                              {task.priority}
                            </span>
                            <span className="category-tag">{task.category}</span>
                          </div>

                          <h5 className="task-title">{task.title}</h5>
                          {task.description && <p className="task-desc">{task.description}</p>}

                          <div className="task-card-footer">
                            <div className="task-actions">
                              <button
                                onClick={() => handleStartEdit(task)}
                                className="task-action-btn edit-btn"
                                title="Edit Task"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="task-action-btn delete-btn"
                                title="Delete Task"
                              >
                                <FaTrash />
                              </button>
                            </div>

                            <div className="column-navigation-controls">
                              <button
                                onClick={() => moveTask(task.id, -1)}
                                disabled={task.status === 'todo'}
                                className="nav-control-btn"
                                title="Move Left"
                              >
                                <FaChevronLeft />
                              </button>
                              <button
                                onClick={() => moveTask(task.id, 1)}
                                disabled={task.status === 'done'}
                                className="nav-control-btn"
                                title="Move Right"
                              >
                                <FaChevronRight />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="empty-column-placeholder"
                      >
                        <FaExclamationCircle />
                        <span>No Tasks</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default KanbanProject;
