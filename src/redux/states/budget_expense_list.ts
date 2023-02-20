import { createSlice } from '@reduxjs/toolkit';
import { BudgetExpenseList } from '../../model/budget';

export const budgetExpenseListEmpty: BudgetExpenseList = {
  pagination: {
    currentPage: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    numOfPages: 0,
  },
};

const budgetExpenseListSlice = createSlice({
  name: 'budgetExpenseList',
  initialState: budgetExpenseListEmpty,
  reducers: {
    createBudgetExpenseList: (_state, action: { payload: BudgetExpenseList }) =>
      action.payload,
    modifyBudgetExpenseList: (state, action) => {
      return { ...state, ...action.payload } as BudgetExpenseList;
    },
    resetBudgetExpenseList: () => budgetExpenseListEmpty,
  },
});

export const {
  createBudgetExpenseList,
  modifyBudgetExpenseList,
  resetBudgetExpenseList,
} = budgetExpenseListSlice.actions;

export default budgetExpenseListSlice.reducer;
