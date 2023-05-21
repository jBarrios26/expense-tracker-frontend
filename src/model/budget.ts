import { Pagination } from '../common/model/pagination';

export interface BudgetList {
  pagination: Pagination;
}

export interface Budget {
  id: string;
  name: string;
  totalSpending: number;
  budgetLimit: number;
  description: string;
  creationDate: string;
  categories: Array<BudgetCategories>;
}

export interface BudgetCategories {
  id: string;
  name: string;
  color: string;
  currentSpending: number;
  limit: number;
}

export interface BudgetExpenseCategory {
  name: string;
  color: string;
  id: string;
}

export interface BudgetExpense {
  id: string;
  name: string;
  amount: number;
  dateOfExpense: Date;
  category: BudgetExpenseCategory;
}

export interface BudgetExpenseList {
  pagination: Pagination;
  editingBudgetExpense?: BudgetExpense;
}
