/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Brain, Settings2, Github } from 'lucide-react';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseChart } from './components/ExpenseChart';
import { ExpenseList } from './components/ExpenseList';

export default function App() {
  const { state, addExpenses, deleteExpense, setLoading, setError } = useExpenses();

  const totalBalance = state.expenses.reduce((acc, curr) => {
    // Quick approximation for display, using existing UZS normalization logic from chart
    const rate = curr.currency === 'USD' ? 12500 : curr.currency === 'EUR' ? 13500 : curr.currency === 'RUB' ? 140 : 1;
    const normalizedAmount = curr.amount * rate;
    return curr.type === 'income' ? acc + normalizedAmount : acc - normalizedAmount;
  }, 0);

  const formatUZS = (value: number) => {
    return new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(value) + ' UZS';
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="h-16 px-4 md:px-8 flex items-center justify-between bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Aqlli Moliya <span className="text-indigo-600">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Balans</span>
            <span className={`text-sm md:text-lg font-bold ${totalBalance >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {totalBalance > 0 ? '+' : ''}{formatUZS(totalBalance)}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden hidden sm:block">
            <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column: AI Interface & Recent Activity */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 lg:overflow-hidden">
          
          <ExpenseForm 
            onAdd={addExpenses} 
            isLoading={state.isLoading} 
            setLoading={setLoading} 
            setError={setError} 
          />

          {state.error && (
            <div className="bg-red-50 text-red-600 p-4 border border-red-200 rounded-2xl text-center font-medium shadow-sm">
              {state.error}
            </div>
          )}

          <div className="flex-1 flex flex-col lg:overflow-hidden">
            <ExpenseList expenses={state.expenses} onDelete={deleteExpense} />
          </div>
        </div>

        {/* Right Column: Stats & Charts */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 lg:overflow-y-auto pb-8 lg:pb-0">
          <ExpenseChart expenses={state.expenses} />
        </div>
      </main>

      {/* Status Bar Footer */}
      <footer className="h-10 bg-white border-t border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">Gemini API: Online</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tighter">LocalStorage: Active</span>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          Aqlli Moliya v1.1.0 • Sleek Layout
        </div>
      </footer>
    </div>
  );
}

