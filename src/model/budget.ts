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

export interface BudgetExpenseList {
  pagination: Pagination;
}
