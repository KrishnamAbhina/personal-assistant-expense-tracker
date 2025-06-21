const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: String,
    amount: Number,
    category: String,
    description: String,
    date: Date
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
