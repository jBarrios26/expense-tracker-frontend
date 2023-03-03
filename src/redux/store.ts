import { configureStore } from '@reduxjs/toolkit';
import { Budget, BudgetList, BudgetExpenseList } from '../model/budget';
import { BudgetUser } from '../model/budget_user';
import { user } from './states';
import budget from './states/budget';
import budget_expense_list from './states/budget_expense_list';
import budget_list_state from './states/budget_list_state';

export interface AppStore {
  user: BudgetUser;
  budgetList: BudgetList;
  budget: Budget;
  budgetExpenseList: BudgetExpenseList;
}

export default configureStore<AppStore>({
  reducer: {
    user: user,
    budgetList: budget_list_state,
    budget: budget,
    budgetExpenseList: budget_expense_list,
  },
});
