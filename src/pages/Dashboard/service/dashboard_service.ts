import { AxiosResponse } from 'axios';
import {
  apiUrl,
  lastTransationPath,
  spentByDayPath,
  topCategoriesPath,
  totalSpentMonthPath,
  totalSpentYearPath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { LastTransactionResponse } from '../models/last_transaction_response';
import { ExpenseChartList } from '../models/expense_chart_list';
import { TopCategoriesResponse } from '../models/top_categories_response';
import { SpentByDayResponse } from '../models/spent_by_day_response';

export default class DashboardService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getLastTransactions(
    userId: string
  ): Promise<LastTransactionResponse> {
    const res = await this._clientInstance.client.get<
      LastTransactionResponse,
      AxiosResponse<LastTransactionResponse, ApiError>
    >(`${lastTransationPath}${userId}`);

    return res.data;
  }

  public async getTotalSpent(
    userId: string,
    year: number
  ): Promise<ExpenseChartList> {
    const res = await this._clientInstance.client.get<
      ExpenseChartList,
      AxiosResponse<ExpenseChartList, ApiError>
    >(`${totalSpentYearPath}${userId}?year=${year}`);

    return res.data;
  }

  public async getTotalSpentByMonth(
    userId: string,
    year: number,
    month: number
  ): Promise<ExpenseChartList> {
    const res = await this._clientInstance.client.get<
      ExpenseChartList,
      AxiosResponse<ExpenseChartList, ApiError>
    >(`${totalSpentMonthPath}${userId}?year=${year}&month=${month + 1}`);

    return res.data;
  }

  public async getTopCategories(
    userId: string
  ): Promise<TopCategoriesResponse> {
    const res = await this._clientInstance.client.get<
      TopCategoriesResponse,
      AxiosResponse<TopCategoriesResponse, ApiError>
    >(`${topCategoriesPath}${userId}`);

    return res.data;
  }

  public async getTotalSpentByDay(userId: string): Promise<SpentByDayResponse> {
    const res = await this._clientInstance.client.get<
      SpentByDayResponse,
      AxiosResponse<SpentByDayResponse, ApiError>
    >(`${spentByDayPath}${userId}`);

    return res.data;
  }
}
