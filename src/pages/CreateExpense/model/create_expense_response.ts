export interface CreateExpenseResponse {
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
