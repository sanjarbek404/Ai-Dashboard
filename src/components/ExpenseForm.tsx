import React, { useState } from 'react';
import { Send, Zap, Loader2 } from 'lucide-react';
import { parseExpensesFromText } from '../services/geminiService';
import { ExpenseInput } from '../types';

interface ExpenseFormProps {
  onAdd: (expenses: ExpenseInput[]) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd, isLoading, setLoading, setError }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const expenses = await parseExpensesFromText(text);
      if (expenses && expenses.length > 0) {
        onAdd(expenses);
        setText('');
      } else {
        setError('Could not identify any expenses in your text.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col gap-4 shrink-0 transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-300">
      <div className="flex items-center gap-2 text-indigo-600 mb-1">
        <Zap className="w-5 h-5" />
        <span className="font-bold uppercase text-xs tracking-widest">AI Assistent</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
        Xarajatni oddiy matn orqali kiriting
      </h2>
      <div className="relative">
        <textarea
          className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors resize-none"
          placeholder="Masalan: 'Bugun tushlikka 50 000 so'm ketdi' yoki '100$ qarz qaytarishdi'..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Tahlil qilish
              <Send className="w-4 h-4" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
