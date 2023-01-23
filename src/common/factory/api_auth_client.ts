import axios, {
  AxiosHeaders,
  AxiosInstance,
  HeadersDefaults,
  RawAxiosRequestHeaders,
} from 'axios';
import { AppStore } from '../../redux/store';
import { AxiosError } from 'axios';
import UserRepository from '../../repository/user_repository';
import { apiUrl } from '../api/api_constants';
import { RefreshTokenResponse } from '../model/refresh_token_response';
import { modifyUser, setNewToken } from '../../redux/states/user';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

let store: ToolkitStore<AppStore>;

export const injectStore = (_store: ToolkitStore<AppStore>) => {
  store = _store;
};

type headers = {
  'Content-Type': string;
  Accept: string;
  Authorization: string;
};

export default class ApiAuthClient {
  private _client: AxiosInstance;

  constructor(baseUrl: string) {
    this._client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      } as headers & HeadersDefaults,
      withCredentials: false,
    });
    this.init();
  }

  public init(): void {
    this._client.interceptors.request.use(
      (config) => {
        const token = store.getState().user.token;

        if (token !== undefined) {
          config.headers = {
            ...config.headers,
          } as RawAxiosRequestHeaders;
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this._client.interceptors.response.use(
      (result) => result,
      async (error: AxiosError) => {
        const originalConfig = error?.config;
        if (error?.response?.status === 401 && originalConfig) {
          const storedToken = UserRepository.getLocalRefreshToken();

          try {
            const rs = await axios.post<RefreshTokenResponse>(
              `${apiUrl}api/user/refresh-token`,
              {
                refreshToken: storedToken,
              }
            );

            const { jwtToken, refreshToken, userId } = rs.data;

            UserRepository.setLocalRefreshToken(refreshToken);
            store.dispatch(modifyUser({ token: jwtToken, userId: userId }));

            originalConfig.headers = {
              ...originalConfig.headers,
            } as RawAxiosRequestHeaders;
            originalConfig.headers['Authorization'] = `Bearer ${jwtToken}`;

            return this._client(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
    );
  }

  public get client(): AxiosInstance {
    return this._client;
  }
}
