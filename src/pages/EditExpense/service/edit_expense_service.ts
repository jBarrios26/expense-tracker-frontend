import { AxiosResponse } from 'axios';
import {
  apiUrl,
  budgetExpenseListPath,
  budgetItemPath,
  editExpensePath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { EditExpenseResponse } from '../model/edit_expense_response';
import { UpdateExpense } from '../model/update_expense';

export default class EditExpenseService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async updateExpense(
    expenseId: string,
    updateExpense: UpdateExpense
  ): Promise<AxiosResponse<EditExpenseResponse, ApiError>> {
    return await this._clientInstance.client.put<
      EditExpenseResponse,
      AxiosResponse<EditExpenseResponse, ApiError>
    >(`${editExpensePath}${expenseId}`, updateExpense);
  }
}
