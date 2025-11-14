import React, { useMemo } from 'react';
import { Expense, Income } from '../types';

interface SummaryProps {
    expenses: Expense[];
    incomes: Income[];
    onAddExpenseClick: () => void;
    onAddIncomeClick: () => void;
}

const Summary: React.FC<SummaryProps> = ({ expenses, incomes, onAddExpenseClick, onAddIncomeClick }) => {
    const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const totalIncome = incomes.reduce((total, income) => {
            const incomeDate = new Date(income.date);
            if(incomeDate.getMonth() === currentMonth && incomeDate.getFullYear() === currentYear) {
                return total + income.amount;
            }
            return total;
        }, 0);

        const totalExpenses = expenses.reduce((total, expense) => {
            const expenseDate = new Date(expense.date);
            if(expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
                return total + expense.amount;
            }
            return total;
        }, 0);

        return {
            totalIncome,
            totalExpenses,
            netBalance: totalIncome - totalExpenses,
        };
    }, [expenses, incomes]);
    
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);

    const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">{currentMonthName} Summary</h2>
                <div className="flex space-x-2">
                    <button onClick={onAddIncomeClick} className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center space-x-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span>Income</span>
                    </button>
                    <button onClick={onAddExpenseClick} className="px-4 py-2 text-sm bg-rose-600 text-white rounded-md hover:bg-rose-700 flex items-center space-x-2 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        <span>Expense</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Income</p>
                    <p className="text-2xl font-semibold text-emerald-500">{formatCurrency(totalIncome)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Expenses</p>
                    <p className="text-2xl font-semibold text-rose-500">{formatCurrency(totalExpenses)}</p>
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Balance</p>
                    <p className={`text-2xl font-semibold ${netBalance >= 0 ? 'text-slate-800 dark:text-white' : 'text-rose-500'}`}>{formatCurrency(netBalance)}</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;