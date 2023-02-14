export interface BudgetItem {
  id: string;
  name: string;
  description: string;
  budgetLimit: number;
  totalSpending: number;
  creationDate: Date;
  categories: BudgetItemCategory[];
}

export interface BudgetItemCategory {
  id: string;
  name: string;
  color: string;
  limit: number;
  currentSpending: number;
}
