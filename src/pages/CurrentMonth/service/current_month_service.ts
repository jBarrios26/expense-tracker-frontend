import { AxiosResponse } from 'axios';
import {
  apiUrl,
  deleteUserBudgetPath,
  userBudgetsPath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { CurrentMonthBudgetListResponse } from '../model/current_month_budget_list_response';

export default class CurrentMonthBudgetService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getUserBudgets(
    userId: string,
    page: number,
    size: number
  ): Promise<AxiosResponse<CurrentMonthBudgetListResponse, ApiError>> {
    return await this._clientInstance.client.get<
      CurrentMonthBudgetListResponse,
      AxiosResponse<CurrentMonthBudgetListResponse, ApiError>
    >(`${userBudgetsPath}${userId}`, { params: { size: size, page: page } });
  }

  public async deleteUserBudget(
    budgetId: string
  ): Promise<AxiosResponse<boolean, ApiError>> {
    return await this._clientInstance.client.delete<
      boolean,
      AxiosResponse<boolean, ApiError>
    >(`${deleteUserBudgetPath}${budgetId}`);
  }
}
