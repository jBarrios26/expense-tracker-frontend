import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import DashboardService from '../service/dashboard_service';
import { ExpenseChartList } from '../models/expense_chart_list';

export function useTotalSpentByMonth(year: number, month: number) {
  const selector = useSelector((app: AppStore) => app.user);

  async function getTotalSpentByMonth(
    userId: string,
    year: number,
    month: number
  ) {
    const service = new DashboardService();
    return await service.getTotalSpentByMonth(userId, year, month);
  }

  const { data, isLoading, error, isError } = useQuery<
    ExpenseChartList,
    AxiosError<ApiError>
  >(
    ['totalSpentMonth', selector.userId, year, month],
    () => getTotalSpentByMonth(selector.userId, year, month),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return { totalSpentByMonth: data, isLoading, error, isError };
}
