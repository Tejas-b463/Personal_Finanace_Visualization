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
    <div className="min-h-screen flex flex-col">
    <header className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-left text-2xl md:text-4xl font-bold text-gray-800">
            Personal Finance Visualization
          </h1>
     </header>

      <main className="flex-1">
        <div className="grid md:grid-cols-2 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl space-y-4">
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
            <SummaryCards transactions={transactions} />
          </div>

          <div className="p-6 space-y-4 rounded-xl">
            <MonthlyChart transactions={transactions} />
            <CategoryBreakdownChart transactions={transactions} />
          </div>
        </div>

        <div className="p-4 mt-2 max-w-6xl mx-auto">
          <TransactionList
            transactions={transactions}
            onTransactionUpdated={(updatedTx) =>
              setTransactions((prev) =>
                prev.map((tx) => (tx._id === updatedTx._id ? updatedTx : tx))
              )
            }
            onTransactionDeleted={(id) =>
              setTransactions((prev) => prev.filter((tx) => tx._id !== id))
            }
          />
        </div>
      </main>
    </div>
  );
};

export default App;
