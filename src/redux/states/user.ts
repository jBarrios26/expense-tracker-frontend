import { BudgetUser } from '../../model/budget_user';
import { createSlice } from '@reduxjs/toolkit';
export const userEmpty: BudgetUser = {
  firstName: '',
  lastName: '',
  gender: '',
  email: '',
  userId: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userEmpty,
  reducers: {
    createUser: (_state, action: { payload: BudgetUser }) => action.payload,
    modifyUser: (state, action) => {
      return { ...state, ...action.payload } as BudgetUser;
    },
    setNewToken: (state, action: { payload: string }) => {
      return { ...state, token: action.payload };
    },
    resetUser: () => userEmpty,
  },
});

export const { createUser, modifyUser, setNewToken, resetUser } =
  userSlice.actions;

export default userSlice.reducer;
