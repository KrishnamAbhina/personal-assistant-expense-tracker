const express = require('express');
const router = express.Router();
const {
  addIncome,
  getIncomes,
  deleteIncome,
  addExpense,
  getExpenses,
  deleteExpense,
  getAllTransactions     // ✅ Add it here only once
} = require('../controllers/transactions');

const { verifyToken } = require('../middleware/auth'); // 🛡️ Protect routes

// Income routes
router.post('/add-income', verifyToken, addIncome);
router.get('/get-incomes', verifyToken, getIncomes);
router.delete('/delete-income/:id', verifyToken, deleteIncome);

// Expense routes
router.post('/add-expense', verifyToken, addExpense);
router.get('/get-expenses', verifyToken, getExpenses);
router.delete('/delete-expense/:id', verifyToken, deleteExpense);

// All transactions combined
router.get('/transactions', verifyToken, getAllTransactions); // ✅ returns only current user's

module.exports = router;
