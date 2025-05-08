import React from 'react';

const SummaryCards = ({ transactions }) => {
  
  const validTransactions = Array.isArray(transactions) ? transactions : [];

 
  const recentTransactions = validTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Calculate total for all transactions
  const total = validTransactions.reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-xs">
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Most Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-600">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => (
                <tr key={tx._id || index} className="bg-gray-50 hover:bg-gray-100 rounded">
                  <td className="px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{tx.description}</td>
                  <td className="px-4 py-2">{tx.category}</td>
                  <td className="px-4 py-2 text-right">${parseFloat(tx.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Total Expense</h3>
          <p className="text-2xl font-semibold">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
