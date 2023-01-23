import { configureStore } from '@reduxjs/toolkit';
import { BudgetList } from '../model/budget';
import { BudgetUser } from '../model/budget_user';
import { user } from './states';
import budget_list_state from './states/budget_list_state';

export interface AppStore {
  user: BudgetUser;
  budgetList: BudgetList;
}

export default configureStore<AppStore>({
  reducer: { user: user, budgetList: budget_list_state },
});
