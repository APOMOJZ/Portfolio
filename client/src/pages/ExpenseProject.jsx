import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, 
  FaPlus, 
  FaTrash, 
  FaSearch, 
  FaUndo, 
  FaWallet, 
  FaArrowUp, 
  FaArrowDown, 
  FaCog 
} from 'react-icons/fa';
import './ExpenseProject.css';

const DEFAULT_TRANSACTIONS = [
  {
    id: 'expense-1',
    title: 'Salary / Client Retainer',
    amount: 3200,
    type: 'income',
    category: 'Salary',
    date: '2026-08-01'
  },
  {
    id: 'expense-2',
    title: 'Workspace Rent',
    amount: 950,
    type: 'expense',
    category: 'Rent',
    date: '2026-08-01'
  },
  {
    id: 'expense-3',
    title: 'Weekly Groceries & Snacks',
    amount: 180,
    type: 'expense',
    category: 'Food',
    date: '2026-08-02'
  },
  {
    id: 'expense-4',
    title: 'AWS Cloud Hosting Bill',
    amount: 75,
    type: 'expense',
    category: 'Utilities',
    date: '2026-08-02'
  },
  {
    id: 'expense-5',
    title: 'Freelance UI/UX Project',
    amount: 850,
    type: 'income',
    category: 'Salary',
    date: '2026-08-02'
  },
  {
    id: 'expense-6',
    title: 'Cinema & Dinner',
    amount: 120,
    type: 'expense',
    category: 'Entertainment',
    date: '2026-08-02'
  }
];

const CATEGORIES = ['Salary', 'Food', 'Rent', 'Utilities', 'Entertainment', 'Other'];

const CATEGORY_COLORS = {
  Salary: '#22c55e',       // green
  Food: '#f59e0b',         // amber
  Rent: '#3b82f6',         // blue
  Utilities: '#06b6d4',    // cyan
  Entertainment: '#ec4899', // pink
  Other: '#64748b'         // slate
};

function ExpenseProject() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('portfolio_expense_transactions');
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('portfolio_expense_budget');
    return saved ? parseFloat(saved) : 1500;
  });

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(budget.toString());
  
  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    localStorage.setItem('portfolio_expense_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('portfolio_expense_budget', budget.toString());
  }, [budget]);

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;
  
  // Budget calculations
  const budgetUsagePercent = Math.min(100, Math.round((totalExpenses / budget) * 100));
  const isOverBudget = totalExpenses > budget;

  // Category Breakdown Calculations (Expenses only)
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.amount) return;

    const newTransaction = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.type === 'income' ? 'Salary' : formData.category,
      date: formData.date
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Reset Form
    setFormData({
      title: '',
      amount: '',
      type: 'expense',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) {
      setBudget(val);
      setIsEditingBudget(false);
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset transactions and budget to sample values?')) {
      setTransactions(DEFAULT_TRANSACTIONS);
      setBudget(1500);
      setBudgetInput('1500');
    }
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || t.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  // SVG Gauge calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (budgetUsagePercent / 100) * circumference;

  return (
    <div className="expense-page">
      <div className="expense-container">
        
        {/* Navigation & Header */}
        <header className="expense-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Portfolio
          </Link>
          <div className="header-title-area">
            <h1>Financial <span className="gradient-text">Expense Tracker</span></h1>
            <p>Monitor your budget, record income and expenses, and view responsive breakdown visual graphs.</p>
          </div>
        </header>

        {/* Top Cards Grid (Balance, Income, Expenses, Budget Gauge) */}
        <div className="metrics-grid">
          
          {/* Card 1: Balance */}
          <div className="card metric-card balance-card">
            <div className="metric-header">
              <span className="metric-title">Remaining Balance</span>
              <div className="metric-icon bg-purple"><FaWallet /></div>
            </div>
            <div className="metric-value" style={{ color: netBalance >= 0 ? 'var(--text-primary)' : '#ef4444' }}>
              ${netBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="metric-subtext">Overall net cash balance</p>
          </div>

          {/* Card 2: Income */}
          <div className="card metric-card">
            <div className="metric-header">
              <span className="metric-title">Total Income</span>
              <div className="metric-icon bg-green"><FaArrowUp /></div>
            </div>
            <div className="metric-value text-green">
              +${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="metric-subtext">Received this period</p>
          </div>

          {/* Card 3: Expenses */}
          <div className="card metric-card">
            <div className="metric-header">
              <span className="metric-title">Total Expenses</span>
              <div className="metric-icon bg-pink"><FaArrowDown /></div>
            </div>
            <div className="metric-value text-pink">
              -${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="metric-subtext">Spent this period</p>
          </div>

          {/* Card 4: Budget Gauge (SVG) */}
          <div className="card metric-card budget-gauge-card">
            <div className="budget-gauge-header">
              <div className="budget-title-wrapper">
                <span className="metric-title">Monthly Limit</span>
                {isEditingBudget ? (
                  <form onSubmit={handleSaveBudget} className="budget-edit-form">
                    <input 
                      type="number" 
                      value={budgetInput} 
                      onChange={(e) => setBudgetInput(e.target.value)}
                      autoFocus
                      onBlur={() => setIsEditingBudget(false)}
                      className="budget-input"
                    />
                  </form>
                ) : (
                  <button onClick={() => setIsEditingBudget(true)} className="edit-budget-btn" title="Set Limit">
                    <FaCog /> <span>${budget}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="gauge-visual-area">
              <svg width="150" height="150" className="gauge-svg">
                <circle 
                  className="gauge-bg" 
                  cx="75" 
                  cy="75" 
                  r={radius} 
                  strokeWidth="10"
                />
                <circle 
                  className="gauge-progress" 
                  cx="75" 
                  cy="75" 
                  r={radius} 
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  stroke={isOverBudget ? '#ef4444' : 'var(--color-primary)'}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                />
              </svg>
              <div className="gauge-text">
                <span className="gauge-pct" style={{ color: isOverBudget ? '#ef4444' : 'white' }}>
                  {budgetUsagePercent}%
                </span>
                <span className="gauge-lbl">Used</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid (Form, History, Chart Breakdown) */}
        <div className="dashboard-grid">
          
          {/* Left Column: Form & Chart Breakdown */}
          <div className="left-dashboard-col">
            
            {/* Action Card: Log Transaction */}
            <div className="card input-card">
              <h3>Log New Transaction</h3>
              <form onSubmit={handleAddTransaction} className="transaction-form">
                
                <div className="form-group">
                  <label htmlFor="title">Transaction Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required 
                    value={formData.title} 
                    onChange={handleInputChange}
                    placeholder="e.g. Coffee, Cloud Service, Salary"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="amount">Amount ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      id="amount" 
                      name="amount" 
                      required 
                      value={formData.amount} 
                      onChange={handleInputChange}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="form-group half-width">
                    <label htmlFor="type">Transaction Type</label>
                    <select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  </div>
                </div>

                {formData.type === 'expense' && (
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
                      {CATEGORIES.filter(c => c !== 'Salary').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date" 
                    required 
                    value={formData.date} 
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <FaPlus /> Record Transaction
                </button>
              </form>
            </div>

            {/* Visual Breakdown Card */}
            <div className="card breakdown-card">
              <h3>Expense Category Breakdown</h3>
              <div className="breakdown-list">
                {CATEGORIES.filter(c => c !== 'Salary').map(cat => {
                  const amt = categoryTotals[cat] || 0;
                  const pct = totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0;
                  const color = CATEGORY_COLORS[cat];

                  return (
                    <div key={cat} className="breakdown-item">
                      <div className="breakdown-item-header">
                        <span className="category-label-wrapper">
                          <span className="category-color-dot" style={{ backgroundColor: color }} />
                          <span className="category-name">{cat}</span>
                        </span>
                        <span className="category-values">
                          <span className="category-amount">${amt.toFixed(2)}</span>
                          <span className="category-percentage">({pct}%)</span>
                        </span>
                      </div>
                      <div className="breakdown-bar-bg">
                        <motion.div 
                          className="breakdown-bar-fill" 
                          style={{ backgroundColor: color }}
                          initial={{ width: '0%' }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
                {totalExpenses === 0 && (
                  <div className="no-expenses-message">
                    No expense records to display breakdown.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Transaction History */}
          <div className="right-dashboard-col">
            <div className="card history-card">
              <div className="history-header">
                <h3>Transaction History</h3>
                <button 
                  onClick={resetToDefault} 
                  className="btn btn-outline reset-btn"
                  title="Reset to default transaction logs"
                >
                  <FaUndo /> Reset
                </button>
              </div>

              {/* Filters Panel */}
              <div className="history-filters">
                <div className="filter-input-wrapper">
                  <FaSearch className="filter-search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-search-input"
                  />
                </div>

                <div className="filters-row">
                  <select 
                    value={typeFilter} 
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Types</option>
                    <option value="income">Incomes</option>
                    <option value="expense">Expenses</option>
                  </select>

                  <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* History List */}
              <div className="history-list">
                <AnimatePresence mode="popLayout">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map(trans => (
                      <motion.div 
                        key={trans.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`history-item ${trans.type}`}
                      >
                        <div className="history-item-left">
                          <span 
                            className="item-category-indicator" 
                            style={{ backgroundColor: CATEGORY_COLORS[trans.category] }}
                            title={trans.category}
                          />
                          <div className="item-details">
                            <div className="item-title">{trans.title}</div>
                            <div className="item-meta">{trans.date} · {trans.category}</div>
                          </div>
                        </div>

                        <div className="history-item-right">
                          <div className={`item-amount ${trans.type}`}>
                            {trans.type === 'income' ? '+' : '-'}${trans.amount.toFixed(2)}
                          </div>
                          <button 
                            onClick={() => handleDeleteTransaction(trans.id)}
                            className="delete-trans-btn"
                            title="Delete transaction log"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      className="empty-history"
                    >
                      No transactions match current filters.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ExpenseProject;
