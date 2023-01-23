import { AxiosResponse } from 'axios';
import { apiUrl, userInfoPath } from '../../../common/api/api_constants';
import ApiAuthClient from '../../../common/factory/api_auth_client';
import { ApiError } from '../../../common/model/error/api_error';
import { UserInfoResponse } from '../model/user_info_response';

export default class HomeService {
  private _clientInstance: ApiAuthClient;

  constructor() {
    this._clientInstance = new ApiAuthClient(apiUrl);
  }

  public async getUserInfo(userId: string): Promise<UserInfoResponse> {
    const res = await this._clientInstance.client.get<
      UserInfoResponse,
      AxiosResponse<UserInfoResponse, ApiError>
    >(`api/user/${userId}`);

    return res.data;
  }
}
