export type Currency = 'UZS' | 'USD' | 'EUR' | 'RUB' | string;

export type TransactionType = 'income' | 'expense';

export interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  currency: Currency;
  date: string;
  type: TransactionType;
}

export interface ExpenseInput {
  description: string;
  category: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
}
