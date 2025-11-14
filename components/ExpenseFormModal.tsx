
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Expense, Category } from '../types';
import { CATEGORIES } from '../constants';
import { suggestCategory } from '../services/geminiService';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({ isOpen, onClose, onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>(Category.Other);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  
  const descriptionDebounceTimeout = useRef<number | null>(null);

  const resetForm = useCallback(() => {
    setAmount('');
    setDescription('');
    setCategory(Category.Other);
    setDate(new Date().toISOString().split('T')[0]);
    setIsSuggesting(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    if (descriptionDebounceTimeout.current) {
      clearTimeout(descriptionDebounceTimeout.current);
    }
    if (description.length > 3) {
      setIsSuggesting(true);
      descriptionDebounceTimeout.current = window.setTimeout(async () => {
        const suggested = await suggestCategory(description);
        if (suggested) {
          setCategory(suggested);
        }
        setIsSuggesting(false);
      }, 800);
    }
    return () => {
      if (descriptionDebounceTimeout.current) {
        clearTimeout(descriptionDebounceTimeout.current);
      }
    };
  }, [description]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && description && category && date) {
      onAddExpense({
        amount: parseFloat(amount),
        description,
        category,
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Add Expense</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full pl-7 pr-12 py-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="0.00"
                    required
                />
            </div>
          </div>
           <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Category</label>
             <div className="relative">
                <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="mt-1 block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-2 pl-3 pr-10"
                required
                >
                {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                {isSuggesting && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="animate-spin h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseFormModal;
