import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserPen, OctagonX } from 'lucide-react';

const TransactionList = ({ transactions, onTransactionUpdated, onTransactionDeleted }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/transactions/${id}`);
      onTransactionDeleted(id);

      const updatedTransactions = transactions.filter(tx => tx._id !== id);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      toast.success('Transaction deleted successfully');
    } catch (error) {
      toast.error('Error deleting transaction');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { amount, description, date, category } = editingTransaction;
      const response = await axios.put(
        `http://localhost:5001/api/transactions/${editingTransaction._id}`,
        { amount, description, date, category }
      );
      onTransactionUpdated(response.data);
      setEditingTransaction(null);
      toast.success('Transaction updated successfully');
    } catch (error) {
      toast.error('Error updating transaction');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTransaction({
      ...editingTransaction,
      [name]: value,
    });
  };

  return (
    <div className="ml-4">
      {editingTransaction ? (
        <form onSubmit={handleUpdate} className="space-y-2 max-w-xl mx-auto ml-16 ">
          <input
            type="number"
            name="amount"
            value={editingTransaction.amount}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            name="date"
            value={editingTransaction.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="description"
            value={editingTransaction.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="category"
            value={editingTransaction.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-1/2 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 cursor-pointer"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingTransaction(null)}
              className="w-1/2 py-3 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className=" text-gray-600 text-sm text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="bg-gray-50 hover:bg-gray-100 rounded">
                <td className="p-3">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-3">{transaction.description}</td>
                <td className="p-3">{transaction.category}</td>
                <td className="p-3 font-medium">${transaction.amount}</td>
                <td className="p-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="cursor-pointer hover:text-blue-800"
                    title="Edit"
                  >
                    <UserPen size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="cursor-pointer hover:text-red-800 mr-2"
                    title="Delete"
                  >
                    <OctagonX size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;
