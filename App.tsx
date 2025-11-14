import React, { useState, useMemo } from 'react';
import { Expense, Category, Income } from './types';
import Header from './components/Header';
import ExpenseFormModal from './components/ExpenseFormModal';
import IncomeFormModal from './components/IncomeFormModal';
import ExpenseList from './components/ExpenseList';
import IncomeList from './components/IncomeList';
import CategoryChart from './components/CategoryChart';
import Summary from './components/Summary';

const App: React.FC = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', amount: 65, description: 'Dinner with friends', category: Category.Food, date: '2024-07-20T19:00:00Z' },
    { id: '2', amount: 12, description: 'Morning Coffee', category: Category.Food, date: '2024-07-20T08:30:00Z' },
    { id: '3', amount: 30, description: 'Gasoline for car', category: Category.Transport, date: '2024-07-19T17:00:00Z' },
    { id: '4', amount: 250, description: 'New pair of sneakers', category: Category.Shopping, date: '2024-07-18T15:45:00Z' },
    { id: '5', amount: 80, description: 'Electricity Bill', category: Category.Bills, date: '2024-07-15T10:00:00Z' },
    { id: '6', amount: 45, description: 'Movie tickets', category: Category.Entertainment, date: '2024-07-17T20:30:00Z' },
  ]);
  const [incomes, setIncomes] = useState<Income[]>([
    { id: 'inc1', amount: 3000, source: 'Salary', date: '2024-07-01T09:00:00Z' },
    { id: 'inc2', amount: 250, source: 'Freelance Project', date: '2024-07-15T14:00:00Z' },
  ]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses]);
  
  const sortedIncomes = useMemo(() => {
    return [...incomes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [incomes]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...expense, id: new Date().toISOString() }]);
    setIsExpenseModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };
  
  const handleUpdateExpenseCategory = (id: string, category: Category) => {
    setExpenses(prev => prev.map(expense => 
      expense.id === id ? { ...expense, category } : expense
    ));
  };

  const handleAddIncome = (income: Omit<Income, 'id'>) => {
    setIncomes(prev => [...prev, { ...income, id: new Date().toISOString() }]);
    setIsIncomeModalOpen(false);
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Summary 
                  expenses={expenses}
                  incomes={incomes}
                  onAddExpenseClick={() => setIsExpenseModalOpen(true)}
                  onAddIncomeClick={() => setIsIncomeModalOpen(true)}
                />
                <ExpenseList 
                    expenses={sortedExpenses} 
                    onDelete={handleDeleteExpense} 
                    onUpdateCategory={handleUpdateExpenseCategory} 
                />
                <IncomeList 
                    incomes={sortedIncomes}
                    onDelete={handleDeleteIncome}
                />
            </div>
            <div>
                <CategoryChart expenses={expenses} />
            </div>
        </div>
      </main>
      <ExpenseFormModal 
        isOpen={isExpenseModalOpen} 
        onClose={() => setIsExpenseModalOpen(false)} 
        onAddExpense={handleAddExpense} 
      />
      <IncomeFormModal 
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onAddIncome={handleAddIncome}
      />
    </>
  );
};

export default App;