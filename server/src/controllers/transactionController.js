import Transaction from "../models/transaction.js"

// Get all transactions
export const getTransactions = async(req, res) => {
    try {
        const txs = await Transaction.find().sort({ date: -1 });
        res.json(txs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new transaction
export const addTransaction = async(req, res) => {
    try {
        const { amount, date, description, category } = req.body;

        // Ensure all fields are provided
        if (!amount || !date || !description || !category) {
            return res.status(400).json({ error: 'Please provide all fields (amount, date, description, category)' });
        }

        const tx = new Transaction({ amount, date, description, category });
        await tx.save();
        res.status(201).json(tx);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing transaction
export const updateTransaction = async(req, res) => {
    try {
        const { amount, date, description, category } = req.body;

        const updatedTx = await Transaction.findByIdAndUpdate(
            req.params.id, { amount, date, description, category }, { new: true }
        );

        if (!updatedTx) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.json(updatedTx);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a transaction
export const deleteTransaction = async(req, res) => {
    try {
        const deletedTx = await Transaction.findByIdAndDelete(req.params.id);

        if (!deletedTx) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};