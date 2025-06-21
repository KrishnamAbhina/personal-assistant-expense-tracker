// controllers/transactions.js

const Income = require('../models/incomemodel');
const Expense = require('../models/expensemodel');

// ✅ Add Income
exports.addIncome = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const income = new Income({ title, amount, category, description, date, userId });
    await income.save();
    res.status(201).json({ message: 'Income Added' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Get Incomes
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Delete Income
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Income Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.id;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number!' });
    }

    const expense = new Expense({ title, amount, category, description, date, userId });
    await expense.save();
    res.status(201).json({ message: 'Expense Added' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Get Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// ✅ Get All Transactions (Income + Expense)
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });

    const combined = [
      ...incomes.map(i => ({ ...i.toObject(), type: 'INCOME' })),
      ...expenses.map(e => ({ ...e.toObject(), type: 'EXPENSE' }))
    ];

    const sorted = combined.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load transactions', error: err.message });
  }
};
