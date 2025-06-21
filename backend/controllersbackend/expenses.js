const ExpenseSchema = require('../models/expensemodel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const expense = new ExpenseSchema({
      title,
      amount,
      category,
      description,
      date,
      user: req.user?.id || 'demoUser' // fallback in case you're testing without auth
    });

    await expense.save();
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getexpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user?.id || 'demoUser' }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteexpense = async (req, res) => {
  const { id } = req.params;
  try {
    await ExpenseSchema.findOneAndDelete({ _id: id, user: req.user?.id || 'demoUser' });
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
