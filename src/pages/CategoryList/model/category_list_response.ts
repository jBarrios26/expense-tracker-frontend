import { BudgetCategory } from './budget_category';

export interface CategoryListResponse {
  success: boolean;
  categories: Array<BudgetCategory>;
}
