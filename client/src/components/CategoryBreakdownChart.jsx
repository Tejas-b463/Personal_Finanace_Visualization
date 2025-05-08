import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#3B82F6', '#2563EB', '#1D4ED8', '#60A5FA', '#93C5FD'];

const CategoryBreakdownChart = ({ transactions }) => {
  
  const validTransactions = Array.isArray(transactions) ? transactions : [];

  const categoryData = validTransactions.reduce((acc, tx) => {
    const category = tx.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + tx.amount;
    return acc;
  }, {});

  const total = Object.values(categoryData).reduce((sum, value) => sum + value, 0);

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percent: ((value / total) * 100).toFixed(0) + '%',
  }));

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-xs">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
      <div className="w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={70}
              labelLine={false}
              isAnimationActive
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center flex-wrap gap-4 text-sm">
        {pieData.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
