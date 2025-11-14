import React from 'react';
import { Income } from '../types';

interface IncomeItemProps {
  income: Income;
  onDelete: (id: string) => void;
}

const IncomeItem: React.FC<IncomeItemProps> = ({ income, onDelete }) => {
  const { id, amount, source, date } = income;

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <li className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{source}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{`+${formattedAmount}`}</p>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onDelete(id)}
              className="p-2 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-500"
              aria-label="Delete income"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
        </div>
      </div>
    </li>
  );
};

export default IncomeItem;