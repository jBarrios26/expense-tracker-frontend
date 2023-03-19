import { BudgetList } from '../../model/budget';
import { createSlice } from '@reduxjs/toolkit';

export const historyBudgetListEmpty: BudgetList = {
  pagination: {
    currentPage: 0,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    numOfPages: 0,
  },
};

const historyBudgetListSlice = createSlice({
  name: 'historyBudget',
  initialState: historyBudgetListEmpty,
  reducers: {
    createHistoryBudgetList: (_state, action: { payload: BudgetList }) =>
      action.payload,
    modifyHistoryBudgetList: (state, action) => {
      return { ...state, ...action.payload } as BudgetList;
    },
    resetHistoryBudgetList: () => historyBudgetListEmpty,
  },
});

export const {
  createHistoryBudgetList: createHistoryBudgetList,
  modifyHistoryBudgetList: modifyHistoryBudgetList,
  resetHistoryBudgetList: resetHistoryBudgetList,
} = historyBudgetListSlice.actions;

export default historyBudgetListSlice.reducer;
