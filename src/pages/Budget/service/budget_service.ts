import { AxiosResponse } from 'axios';
import {
  apiUrl,
  budgetExpenseListPath,
  budgetItemPath,
  deleteExpensePath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { BudgetItem } from '../model/budget_item';
import { ExpenseList } from '../model/expense_list';

export default class BudgetService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getBudget(
    budgetId: string
  ): Promise<AxiosResponse<BudgetItem, ApiError>> {
    return await this._clientInstance.client.get<
      BudgetItem,
      AxiosResponse<BudgetItem, ApiError>
    >(`${budgetItemPath}${budgetId}`);
  }

  public async getBudgetExpenses(
    budgetId: string,
    size: number,
    page: number
  ): Promise<AxiosResponse<ExpenseList, ApiError>> {
    return await this._clientInstance.client.get<
      ExpenseList,
      AxiosResponse<ExpenseList, ApiError>
    >(`${budgetExpenseListPath}${budgetId}`, {
      params: { size: size, page: page },
    });
  }

  public async deleteExpense(expenseId: string) {
    return await this._clientInstance.client.delete<
      boolean,
      AxiosResponse<boolean, ApiError>
    >(`${deleteExpensePath}${expenseId}`);
  }
}
