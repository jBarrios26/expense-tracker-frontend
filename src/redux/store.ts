import { configureStore } from '@reduxjs/toolkit';
import { Budget, BudgetList } from '../model/budget';
import { BudgetUser } from '../model/budget_user';
import { user } from './states';
import budget from './states/budget';
import budget_list_state from './states/budget_list_state';

export interface AppStore {
  user: BudgetUser;
  budgetList: BudgetList;
  budget: Budget;
}

export default configureStore<AppStore>({
  reducer: { user: user, budgetList: budget_list_state, budget: budget },
});
