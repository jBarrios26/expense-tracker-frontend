import { AxiosResponse } from 'axios';
import {
  apiUrl,
  categoriesPath,
  createBudgetPath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { Categories } from '../model/categories';
import { CreateBudgetResponse } from '../model/create_budget_response';
import { BudgetCategory } from '../CreateBudget';

export default class CreateBudgetService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getUserCategories(userId: string): Promise<Categories> {
    const res = await this._clientInstance.client.get<
      Categories,
      AxiosResponse<Categories, ApiError>
    >(`${categoriesPath}${userId}`);

    return res.data;
  }

  public async createBudget(
    budgetDate: Date,
    name: string,
    description: string,
    budgetAmountLimit: number,
    budgetUserID: string,
    expenseList: Array<BudgetCategory>
  ): Promise<CreateBudgetResponse> {
    const result = await this._clientInstance.client.post<
      CreateBudgetResponse,
      AxiosResponse<CreateBudgetResponse, ApiError>
    >(createBudgetPath, {
      budgetDate: budgetDate,
      name: name,
      description: description,
      budgetAmountLimit: budgetAmountLimit,
      budgetUserID: budgetUserID,
      expenseList: expenseList,
    });
    return result.data;
  }
}
