import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Expense } from '../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b', '#06b6d4'];

const EXCHANGE_RATES: Record<string, number> = {
  UZS: 1,
  USD: 12500,
  EUR: 13500,
  RUB: 140,
};

function normalizeToUZS(amount: number, currency: string) {
  const rate = EXCHANGE_RATES[currency.toUpperCase()] || 1;
  return amount * rate;
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const categoryData = useMemo(() => {
    const acc: Record<string, number> = {};
    expenses
      .filter(e => e.type === 'expense')
      .forEach((e) => {
        const normalizedAmount = normalizeToUZS(e.amount, e.currency);
        if (!acc[e.category]) {
          acc[e.category] = 0;
        }
        acc[e.category] += normalizedAmount;
      });

    return Object.entries(acc)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  const totalBalance = useMemo(() => {
    return expenses.reduce((acc, curr) => {
      const amountUZS = normalizeToUZS(curr.amount, curr.currency);
      return curr.type === 'income' ? acc + amountUZS : acc - amountUZS;
    }, 0);
  }, [expenses]);

  if (expenses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-400 bg-white shadow-sm rounded-3xl border border-slate-100 border-dashed">
        <p>No expenses to display yet</p>
      </div>
    );
  }

  const formatUZS = (value: number) => {
    return new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(value) + ' UZS';
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Umumiy Balans</p>
          <h4 className={`text-3xl font-bold tracking-tight mb-3 ${totalBalance >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {totalBalance > 0 ? '+' : ''}{new Intl.NumberFormat('uz-UZ').format(totalBalance)} UZS
          </h4>
          <div className="flex items-center gap-2 text-indigo-600">
            <span className="text-xs font-bold uppercase tracking-widest">{expenses.length} ta operatsiya</span>
          </div>
        </div>
        <div className="bg-indigo-600 rounded-3xl p-6 shadow-lg shadow-indigo-100 text-white relative overflow-hidden flex items-center justify-center text-center">
          <div className="relative z-10 w-full">
            <p className="text-xs font-semibold opacity-70 uppercase tracking-widest mb-2">AI Maslahati</p>
            <h4 className="text-sm md:text-md font-medium leading-tight mb-2 italic">
              "Xarajatlaringiz doimiy nazoratda. Davom eting!"
            </h4>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[400px]">
        {/* Categories Pie Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col h-full">
          <h3 className="font-bold text-lg text-slate-800 mb-4 shrink-0">Xarajatlar (Kategoriya)</h3>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatUZS(value), '']} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h3 className="font-bold text-lg text-slate-800">Dinamika</h3>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }} />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value: number) => [formatUZS(value), '']} 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontWeight: 'bold' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
