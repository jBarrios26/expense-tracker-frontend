import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import DashboardService from '../service/dashboard_service';
import { ExpenseChartList } from '../models/expense_chart_list';

export function useTotalSpent(year: number) {
  const selector = useSelector((app: AppStore) => app.user);

  async function getTotalSpent(userId: string, year: number) {
    const service = new DashboardService();
    return await service.getTotalSpent(userId, year);
  }

  const { data, isLoading, error, isError } = useQuery<
    ExpenseChartList,
    AxiosError<ApiError>
  >(
    ['totalSpentYear', selector.userId],
    () => getTotalSpent(selector.userId, year),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return { totalSpent: data, isLoading, error, isError };
}
