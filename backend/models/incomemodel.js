const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Income', IncomeSchema);
