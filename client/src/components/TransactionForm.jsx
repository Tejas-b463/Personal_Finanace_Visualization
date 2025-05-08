import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/categories.json');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/transactions', formData);
      toast.success('Transaction added successfully!');
      onTransactionAdded(response.data);
      setFormData({
        amount: '',
        date: '',
        description: '',
        category: '',
      });
    } catch (error) {
      toast.error('Error adding transaction!');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-xs">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="$0.00"
              className="w-full p-2.5 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Internet bill"
            className="w-full p-2.5 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
