import React, { useEffect, useState } from 'react';
import TransactionForm from './components/TransactionForm';
import MonthlyChart from './components/MonthlyChart';
import SummaryCards from './components/SummaryCards';
import CategoryBreakdownChart from './components/CategoryBreakdownChart';
import TransactionList from './components/TransactionList';
import ShimmerUI from './components/ShimmerUI'; 
import axios from 'axios';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const apiUrl = "https://personal-finance-visualization.onrender.com/api";
        const response = await axios.get(`${apiUrl}/transactions`, {
          timeout: 15000
        });
        setTransactions(response.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  const handleTransactionUpdated = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
    );
  };

  const handleTransactionDeleted = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx._id !== id));
  };

  if (loading) return <ShimmerUI />;
  
  if (error) {
    return (
      <div className="text-center text-red-600 mt-10 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Personal Finance Visualization</h1>
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <SummaryCards transactions={transactions} />
      <MonthlyChart transactions={transactions} />
      <CategoryBreakdownChart transactions={transactions} />
      <TransactionList
        transactions={transactions}
        onTransactionUpdated={handleTransactionUpdated}
        onTransactionDeleted={handleTransactionDeleted}
      />
    </div>
  );
};

export default App;
