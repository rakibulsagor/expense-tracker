import React, { useState } from 'react';
import { Expense, Category } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS, CATEGORY_BG_COLORS, CATEGORIES } from '../constants';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onUpdateCategory: (id: string, category: Category) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete, onUpdateCategory }) => {
  const { id, amount, description, category, date } = expense;
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>(category);

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  const handleSave = () => {
    onUpdateCategory(id, newCategory);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewCategory(category);
    setIsEditing(false);
  };

  return (
    <li className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200 group">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-full ${CATEGORY_BG_COLORS[category]} ${CATEGORY_COLORS[category]}`}>
          {CATEGORY_ICONS[category]}
        </div>
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{description}</p>
          {isEditing ? (
             <div className="flex items-center space-x-2 mt-1">
                <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Category)}
                    className="block w-full border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 py-1 pl-2 pr-8 text-sm"
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button onClick={handleSave} className="px-2 py-1 text-xs bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Save</button>
                <button onClick={handleCancel} className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
             </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">{category} &bull; {formattedDate}</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="font-bold text-lg text-slate-900 dark:text-white">{formattedAmount}</p>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-500"
              aria-label="Edit expense category"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
              </svg>
            </button>
            <button 
              onClick={() => onDelete(id)}
              className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500"
              aria-label="Delete expense"
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

export default ExpenseItem;
