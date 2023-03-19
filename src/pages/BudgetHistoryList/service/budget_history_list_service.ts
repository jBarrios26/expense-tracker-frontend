import { AxiosResponse } from 'axios';
import {
  apiUrl,
  getBudgetHistoryPath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { HistoryBudgetListResponse } from '../model/budget_history_list_response';

export default class BudgetHistoryService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getBudgetHistoryList(
    userId: string,
    page: number,
    size: number,
    month: number,
    year: number
  ): Promise<AxiosResponse<HistoryBudgetListResponse, ApiError>> {
    return await this._clientInstance.client.get<
      HistoryBudgetListResponse,
      AxiosResponse<HistoryBudgetListResponse, ApiError>
    >(`${getBudgetHistoryPath}${userId}`, {
      params: { page: page, size: size, month: month, year: year },
    });
  }
}
