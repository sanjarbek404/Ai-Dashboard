import React from 'react';
import { Trash2, ShoppingBag, Utensils, Car, Lightbulb, HeartPulse, GraduationCap, CircleDollarSign } from 'lucide-react';
import { Expense } from '../types';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const CategoryIcon = ({ category }: { category: string }) => {
  const cat = category.toLowerCase();
  if (cat.includes('food') || cat.includes('tushlik') || cat.includes('ovqat')) return <Utensils className="w-5 h-5" />;
  if (cat.includes('transport') || cat.includes('taxi') || cat.includes('taksi')) return <Car className="w-5 h-5" />;
  if (cat.includes('shop')) return <ShoppingBag className="w-5 h-5" />;
  if (cat.includes('bill') || cat.includes('util')) return <Lightbulb className="w-5 h-5" />;
  if (cat.includes('health') || cat.includes('med')) return <HeartPulse className="w-5 h-5" />;
  if (cat.includes('edu') || cat.includes('o\'qish')) return <GraduationCap className="w-5 h-5" />;
  return <CircleDollarSign className="w-5 h-5" />;
};

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat('uz-UZ', { 
    style: 'currency', 
    currency: currency.toUpperCase() || 'UZS',
    maximumFractionDigits: 0
  }).format(amount);
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex-1 flex flex-col mt-0 h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="font-bold text-slate-800">Oxirgi amallar</h3>
        <span className="text-indigo-600 text-sm font-semibold">{expenses.length} records</span>
      </div>
      <div className="space-y-3 overflow-y-auto pr-2 pb-2">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl group border border-transparent hover:border-slate-200">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${expense.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                <CategoryIcon category={expense.category} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 w-[120px] sm:w-[150px] md:w-[200px] truncate">{expense.description}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  <span className="font-medium mr-1">{expense.category.toUpperCase()}</span> • 
                  <span className="ml-1">{format(new Date(expense.date), 'MMM d, HH:mm')}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`font-bold text-sm md:text-base whitespace-nowrap ${expense.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                {expense.type === 'income' ? '+' : '-'}{formatAmount(expense.amount, expense.currency)}
              </span>
              <button
                onClick={() => onDelete(expense.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
