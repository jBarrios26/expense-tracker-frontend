import { Pagination } from '../../../common/model/pagination';

export interface CurrentMonthBudgetListResponse {
  pagination: Pagination;
  budgets: Array<CurrentMonthBudget>;
}

export interface CurrentMonthBudget {
  budgetId: string;
  name: string;
  createdAt: Date;
  topCategories: Array<CurrentMonthCategories>;
}

export interface CurrentMonthCategories {
  name: string;
  color: string;
}
