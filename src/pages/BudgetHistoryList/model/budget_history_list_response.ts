import { Pagination } from '../../../common/model/pagination';

export interface HistoryBudgetListResponse {
  pagination: Pagination;
  budgets: Array<HistoryMonthBudget>;
}

export interface HistoryMonthBudget {
  budgetId: string;
  name: string;
  createdAt: Date;
  topCategories: Array<HistoryMonthCategories>;
}

export interface HistoryMonthCategories {
  name: string;
  color: string;
}
