import React from 'react';
import { Income } from '../types';
import IncomeItem from './IncomeItem';

interface IncomeListProps {
  incomes: Income[];
  onDelete: (id: string) => void;
}

const IncomeList: React.FC<IncomeListProps> = ({ incomes, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
       <h2 className="text-xl font-bold p-4 border-b border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white">Recent Income</h2>
        {incomes.length === 0 ? (
            <p className="text-center p-8 text-slate-500">No income recorded yet. Add one to get started!</p>
        ) : (
            <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                {incomes.map(income => (
                    <IncomeItem key={income.id} income={income} onDelete={onDelete} />
                ))}
            </ul>
        )}
    </div>
  );
};

export default IncomeList;