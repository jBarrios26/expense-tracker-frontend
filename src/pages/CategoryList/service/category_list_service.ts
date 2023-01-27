import { AxiosResponse } from 'axios';
import {
  apiUrl,
  createCategoryPath,
  userCategoriesPath,
} from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { CategoryListResponse } from '../model/category_list_response';
import { CreateCategoryResponse } from '../model/create_category_response';

export default class CategoryListService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getUserCategories(
    userId: string
  ): Promise<CategoryListResponse> {
    const res = await this._clientInstance.client.get<
      CategoryListResponse,
      AxiosResponse<CategoryListResponse, ApiError>
    >(`${userCategoriesPath}${userId}`);

    return res.data;
  }

  public async createCategory(
    userId: string,
    name: string,
    color: string
  ): Promise<CreateCategoryResponse> {
    const res = await this._clientInstance.client.post<
      CreateCategoryResponse,
      AxiosResponse<CreateCategoryResponse, ApiError>
    >(`${createCategoryPath}`, {
      name: name,
      color: color,
      userId: userId,
    });

    return res.data;
  }
}
