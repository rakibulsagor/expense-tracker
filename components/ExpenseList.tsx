import React from 'react';
import { Expense, Category } from '../types';
import ExpenseItem from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onUpdateCategory: (id: string, category: Category) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onUpdateCategory }) => {
  return (
    <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
       <h2 className="text-xl font-bold p-4 border-b border-slate-200 dark:border-slate-700">Recent Transactions</h2>
        {expenses.length === 0 ? (
            <p className="text-center p-8 text-slate-500">No expenses yet. Add one to get started!</p>
        ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {expenses.map(expense => (
                    <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} onUpdateCategory={onUpdateCategory} />
                ))}
            </ul>
        )}
    </div>
  );
};

export default ExpenseList;
