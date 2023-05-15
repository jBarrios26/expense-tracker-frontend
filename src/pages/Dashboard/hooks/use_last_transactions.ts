import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import DashboardService from '../service/dashboard_service';
import { LastTransactionResponse } from '../models/last_transaction_response';

export function useLastTransactions() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getLastTransactions(userId: string) {
    const service = new DashboardService();
    return await service.getLastTransactions(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    LastTransactionResponse,
    AxiosError<ApiError>
  >(
    ['lastTransactionChart', selector.userId],
    () => getLastTransactions(selector.userId),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return { transactions: data, isLoading, error, isError };
}
