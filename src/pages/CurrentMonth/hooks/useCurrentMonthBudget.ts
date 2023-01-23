import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import CurrentMonthBudgetService from '../service/current_month_service';
import { CurrentMonthBudgetListResponse } from '../model/current_month_budget_list_response';

export function useBudgetList(
  page: number,
  size: number,
  onSuccess: (data: CurrentMonthBudgetListResponse) => void
) {
  const selector = useSelector((app: AppStore) => app.user);

  async function getUserBudgets(userId: string, page: number, size: number) {
    const service = new CurrentMonthBudgetService();
    return await service.getUserBudgets(userId, page, size);
  }

  const { isLoading, error, isFetching, isError, data } = useQuery<
    CurrentMonthBudgetListResponse,
    AxiosError<ApiError>
  >(
    ['userBudgetList', selector.userId, page, size],
    () => getUserBudgets(selector.userId, page, size),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
        onSuccess(data);
      },
      keepPreviousData: true,
    }
  );

  return {
    budgetsLoading: isLoading,
    budgetsHasError: isError,
    budgetsError: error,
    budgetList: data,
    budgetFetching: isFetching,
  };
}
