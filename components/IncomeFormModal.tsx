import React, { useState, useEffect, useCallback } from 'react';
import { Income } from '../types';

interface IncomeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIncome: (income: Omit<Income, 'id'>) => void;
}

const IncomeFormModal: React.FC<IncomeFormModalProps> = ({ isOpen, onClose, onAddIncome }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const resetForm = useCallback(() => {
    setAmount('');
    setSource('');
    setDate(new Date().toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && source && date) {
      onAddIncome({
        amount: parseFloat(amount),
        source,
        date: new Date(date).toISOString(),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md m-4 p-6 transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Add Income</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="income-amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    id="income-amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-7 pr-12 py-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                    required
                />
            </div>
          </div>
           <div>
            <label htmlFor="source" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Source</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-1 block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="e.g. Salary, Freelance"
              required
            />
          </div>
          <div>
            <label htmlFor="income-date" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Date</label>
            <input
              type="date"
              id="income-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Add Income</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomeFormModal;