import ApiClient from '../../../common/factory/api_client';
import { apiUrl, signUpPath } from '../../../common/api/api_constants';
import { SignUpResponse } from '../model/sign_up_response';
import { AxiosResponse } from 'axios';
import { ApiError } from '../../../common/model/error/api_error';

export default class SignUpService {
  private _clientInstance: ApiClient;

  constructor() {
    this._clientInstance = new ApiClient(apiUrl);
  }

  public async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    gender: string
  ): Promise<SignUpResponse> {
    return (
      await this._clientInstance.client.post<
        SignUpResponse,
        AxiosResponse<SignUpResponse, ApiError>
      >(signUpPath, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        password: password,
      })
    ).data;
  }
}
