import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyChart = ({ transactions }) => {
  const [chartData, setChartData] = useState([]);

  const groupTransactionsByMonth = (transactions) => {
    if (!Array.isArray(transactions)) {
      return []; 
    }

    const groupedData = {};

    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })}`;

      if (!groupedData[monthYear]) {
        groupedData[monthYear] = 0;
      }
      groupedData[monthYear] += tx.amount;
    });

    const formattedData = Object.keys(groupedData).map((key) => ({
      name: key,
      total: groupedData[key],
    }));

    return formattedData;
  };

  useEffect(() => {
    if (Array.isArray(transactions) && transactions.length > 0) {
      const newChartData = groupTransactionsByMonth(transactions);
      setChartData(newChartData);
    }
  }, [transactions]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-xs">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
