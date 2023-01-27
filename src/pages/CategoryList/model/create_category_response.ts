import { BudgetCategory } from './budget_category';
export interface CreateCategoryResponse {
  category: BudgetCategory;
  success: boolean;
}
