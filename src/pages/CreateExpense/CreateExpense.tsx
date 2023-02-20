import React from 'react';
import { BudgetItemCategory } from '../Budget/model/budget_item';
export interface CreateExpenseInterface {
  budgetCategories: BudgetItemCategory[];
}

const CreateExpense: React.FC<CreateExpenseInterface> = () => {
  return <div>CreateExpense</div>;
};

export default CreateExpense;
