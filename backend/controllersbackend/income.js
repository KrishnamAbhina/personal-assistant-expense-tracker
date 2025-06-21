const IncomeModel = require('../models/incomemodel');

// Add new income
exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user.userId;

    try {
        // Validations
        if (!title || !category || !description || !date || amount === undefined) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const income = new IncomeModel({
            userId,
            title,
            amount,
            category,
            description,
            date
        });

        await income.save();
        res.status(200).json({ message: 'Income Added Successfully!' });
    } catch (error) {
        console.error('Error adding income:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get all incomes for a user
exports.getIncomes = async (req, res) => {
    const userId = req.user.userId;

    try {
        const incomes = await IncomeModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Delete an income by ID (only if it belongs to the user)
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const deleted = await IncomeModel.findOneAndDelete({ _id: id, userId });
        if (!deleted) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income Deleted Successfully' });
    } catch (error) {
        console.error('Error deleting income:', error.message);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
