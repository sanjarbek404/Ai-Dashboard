import { useEffect, useReducer } from 'react';
import { Expense, ExpenseInput } from '../types';

interface AppState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

type Action =
  | { type: 'ADD_EXPENSES'; payload: Expense[] }
  | { type: 'DELETE_EXPENSE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'INITIALIZE'; payload: Expense[] };

const initialState: AppState = {
  expenses: [],
  isLoading: false,
  error: null,
};

function expenseReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSES':
      return { ...state, expenses: [...action.payload, ...state.expenses] };
    case 'DELETE_EXPENSE':
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function useExpenses() {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ai-expenses');
      if (stored) {
        dispatch({ type: 'INITIALIZE', payload: JSON.parse(stored) });
      }
    } catch (e) {
      console.error('Failed to load expenses from local storage');
    }
  }, []);

  // Save to LocalStorage whenever expenses change
  useEffect(() => {
    if (state.expenses !== initialState.expenses) {
      localStorage.setItem('ai-expenses', JSON.stringify(state.expenses));
    }
  }, [state.expenses]);

  const addExpenses = (newExpenses: ExpenseInput[]) => {
    const expensesWithIds: Expense[] = newExpenses.map((e) => ({
      ...e,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    }));
    dispatch({ type: 'ADD_EXPENSES', payload: expensesWithIds });
  };

  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  return {
    state,
    addExpenses,
    deleteExpense,
    setLoading,
    setError,
  };
}
