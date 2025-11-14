import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense, Category } from '../types';

interface CategoryChartProps {
  expenses: Expense[];
}

const COLORS: Record<Category, string> = {
    [Category.Food]: '#10B981',
    [Category.Transport]: '#3B82F6',
    [Category.Shopping]: '#8B5CF6',
    [Category.Bills]: '#F59E0B',
    [Category.Entertainment]: '#EF4444',
    [Category.Health]: '#EC4899',
    [Category.Other]: '#64748B',
};

const CategoryChart: React.FC<CategoryChartProps> = ({ expenses }) => {
  const data = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<Category, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name: name as Category,
      // Fix: Cast `value` to `number` to resolve TypeScript error. Some TypeScript
      // configurations may infer `value` from `Object.entries` as `unknown`.
      value: parseFloat((value as number).toFixed(2)),
    })).sort((a, b) => b.value - a.value);
  }, [expenses]);
  
  if (data.length === 0) {
      return (
         <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
             <h2 className="text-xl font-bold mb-4 w-full">Spending by Category</h2>
             <p className="text-slate-500">No data to display. Add an expense to see your spending breakdown.</p>
         </div>
      );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-lg shadow-md h-[400px]">
      <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: '#475569',
              borderRadius: '0.5rem',
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;