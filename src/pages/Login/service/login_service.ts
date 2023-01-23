import ApiClient from '../../../common/factory/api_client';
import { apiUrl, loginPath } from '../../../common/api/api_constants';
import { AxiosResponse } from 'axios';
import { ApiError } from '../../../common/model/error/api_error';
import { LoginResponse } from '../model/LoginResponse';

export default class LoginService {
  private _clientInstance: ApiClient;

  constructor() {
    this._clientInstance = new ApiClient(apiUrl);
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    return (
      await this._clientInstance.client.post<
        LoginResponse,
        AxiosResponse<LoginResponse, ApiError>
      >(loginPath, {
        email: email,
        password: password,
      })
    ).data;
  }
}
