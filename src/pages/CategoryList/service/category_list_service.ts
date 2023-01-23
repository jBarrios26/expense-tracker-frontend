import { AxiosResponse } from 'axios';
import { apiUrl, userCategoriesPath } from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { CategoryListResponse } from '../model/category_list_response';

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
}
