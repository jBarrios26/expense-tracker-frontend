import { AxiosResponse } from 'axios';
import { apiUrl, createExpensePath } from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { CreateExpenseResponse } from '../model/create_expense_response';

export default class CreateExpenseService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async addExpense(
    name: string,
    date: Date,
    amount: number,
    budget: string,
    category: string
  ): Promise<AxiosResponse<CreateExpenseResponse, ApiError>> {
    return await this._clientInstance.client.post<
      CreateExpenseResponse,
      AxiosResponse<CreateExpenseResponse, ApiError>
    >(`${createExpensePath}`, {
      name: name,
      date: date,
      amount: amount,
      budget: budget,
      category: category,
    });
  }
}
