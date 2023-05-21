import { createSlice } from '@reduxjs/toolkit';
import { BudgetExpense, BudgetExpenseList } from '../../model/budget';

export const budgetExpenseListEmpty: BudgetExpenseList = {
  pagination: {
    currentPage: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    numOfPages: 0,
  },
  editingBudgetExpense: undefined,
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
    setEditingExpense: (state, action) => {
      return {
        ...state,
        editingBudgetExpense: action.payload as BudgetExpense,
      };
    },
    clearEditingExpense: (state, _) => {
      return { ...state, editingBudgetExpense: undefined };
    },
    resetBudgetExpenseList: () => budgetExpenseListEmpty,
  },
});

export const {
  createBudgetExpenseList,
  modifyBudgetExpenseList,
  resetBudgetExpenseList,
  clearEditingExpense,
  setEditingExpense,
} = budgetExpenseListSlice.actions;

export default budgetExpenseListSlice.reducer;
