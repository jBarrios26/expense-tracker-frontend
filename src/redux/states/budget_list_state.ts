import { BudgetList } from '../../model/budget';
import { createSlice } from '@reduxjs/toolkit';

export const budgetListEmpty: BudgetList = {
  pagination: {
    currentPage: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    numOfPages: 0,
  },
};

const budgetListSlice = createSlice({
  name: 'budget',
  initialState: budgetListEmpty,
  reducers: {
    createBudgetList: (_state, action: { payload: BudgetList }) =>
      action.payload,
    modifyBudgetList: (state, action) => {
      return { ...state, ...action.payload } as BudgetList;
    },
    resetBudgetList: () => budgetListEmpty,
  },
});

export const { createBudgetList, modifyBudgetList, resetBudgetList } =
  budgetListSlice.actions;

export default budgetListSlice.reducer;
