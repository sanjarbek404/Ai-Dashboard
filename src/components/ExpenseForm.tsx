import React, { useState, useEffect } from 'react';
import { Plus, Minus, Send, Wallet, Tag, AlignLeft } from 'lucide-react';
import { ExpenseInput, TransactionType, Currency } from '../types';

interface ExpenseFormProps {
  onAdd: (expenses: ExpenseInput[]) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Business', 'Gift', 'Other'];
const CURRENCIES: Currency[] = ['UZS', 'USD', 'EUR', 'RUB'];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, setError }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<Currency>('UZS');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [description, setDescription] = useState('');

  // Update categories automatically when transaction type changes
  useEffect(() => {
    if (type === 'expense' && !EXPENSE_CATEGORIES.includes(category)) {
      setCategory(EXPENSE_CATEGORIES[0]);
    } else if (type === 'income' && !INCOME_CATEGORIES.includes(category)) {
      setCategory(INCOME_CATEGORIES[0]);
    }
  }, [type, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Iltimos, to'g'ri summa kiriting!");
      return;
    }
    if (!description.trim()) {
      setError("Iltimos, izoh kiriting!");
      return;
    }

    const newTransaction: ExpenseInput = {
      type,
      amount: Number(amount),
      currency,
      category,
      description: description.trim()
    };

    onAdd([newTransaction]);
    
    // Reset form for lightning fast entry
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-5 shrink-0 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-300">
      <div className="flex items-center gap-2 text-indigo-600 mb-1">
        <Wallet className="w-5 h-5 flex-shrink-0" />
        <span className="font-bold uppercase text-xs tracking-widest whitespace-nowrap">Yangi Amaliyot</span>
      </div>

      {/* Type Selector (Daromad / Xarajat) */}
      <div className="flex p-1 bg-slate-100 rounded-xl mt-1">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
            type === 'expense' 
              ? 'bg-white text-red-500 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Minus className="w-4 h-4" />
          Xarajat
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
            type === 'income' 
              ? 'bg-white text-emerald-500 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Plus className="w-4 h-4" />
          Daromad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Summa va Valyuta */}
        <div className="flex flex-col gap-1.5 focus-within:text-indigo-600 transition-colors">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Summa</label>
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <div className="flex items-center justify-center pl-4 text-slate-400">
              {type === 'income' ? <Plus className="w-4 h-4 text-emerald-500" /> : <Minus className="w-4 h-4 text-red-500" />}
            </div>
            <input
              type="number"
              step="any"
              className="w-full bg-transparent border-none outline-none text-slate-800 p-3 font-semibold placeholder:font-normal"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="h-full w-px bg-slate-200 mx-1 my-auto"></div>
            <select
              className="bg-transparent border-none outline-none text-slate-600 font-bold px-3 py-3 cursor-pointer appearance-none"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Categoriya */}
        <div className="flex flex-col gap-1.5 focus-within:text-indigo-600 transition-colors">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Kategoriya</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all pr-3">
            <div className="pl-4 text-slate-400">
              <Tag className="w-4 h-4" />
            </div>
            <select
              className="w-full bg-transparent border-none outline-none text-slate-700 p-3 font-medium cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {(type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Izoh */}
      <div className="flex flex-col gap-1.5 focus-within:text-indigo-600 transition-colors">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Izoh</label>
        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <div className="pl-4 text-slate-400">
            <AlignLeft className="w-4 h-4" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-slate-700 p-3 font-medium placeholder:font-normal"
            placeholder={type === 'expense' ? "Masalan: 'Tushlik uchun'" : "Masalan: 'Oylik maoshik'"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <Send className="w-5 h-5" />
        Kiritish
      </button>
    </form>
  );
};
