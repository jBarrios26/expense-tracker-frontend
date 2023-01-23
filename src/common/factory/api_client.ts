import axios, { AxiosInstance } from 'axios';

export default class ApiClient {
  private _client: AxiosInstance;

  constructor(baseUrl: string) {
    this._client = axios.create({ baseURL: baseUrl });
  }

  public get client(): AxiosInstance {
    return this._client;
  }
}
