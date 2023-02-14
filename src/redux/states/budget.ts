import { Budget } from '../../model/budget';
import { createSlice } from '@reduxjs/toolkit';

export const emtpyBudget: Budget = {
  name: '',
  id: '',
  budgetLimit: 0,
  totalSpending: 0,
  description: '',
  categories: [],
  creationDate: '',
};

const budgetSlice = createSlice({
  name: 'budget_item',
  initialState: emtpyBudget,
  reducers: {
    createBudget: (_state, action: { payload: Budget }) => action.payload,
    modifyBudget: (state, action) => {
      return { ...state, ...action.payload } as Budget;
    },
    resetBudget: () => emtpyBudget,
  },
});

export const { createBudget, modifyBudget, resetBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
