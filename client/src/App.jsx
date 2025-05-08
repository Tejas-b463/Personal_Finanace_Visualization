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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/transactions`);
        setTransactions(res.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  if (loading) {
    return <ShimmerUI />;
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
