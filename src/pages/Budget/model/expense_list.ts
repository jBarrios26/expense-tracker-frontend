import { Pagination } from '../../../common/model/pagination';
export interface ExpenseList {
  expenseList: Array<Expense>;
  pagination: Pagination;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  dateOfExpense: Date;
  category: ExpenseCategory;
}

export interface ExpenseCategory {
  name: string;
  color: string;
}
