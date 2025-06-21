const express = require('express');
const router = express.Router();
const { addIncome, getincomes, deleteincome } = require('../controllers/income');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/add-income', authenticateToken, addIncome);
router.get('/get-incomes', authenticateToken, getincomes);
router.delete('/delete-income/:id', authenticateToken, deleteincome);

module.exports = router;
