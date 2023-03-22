import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import { HistoryBudgetListResponse } from '../model/budget_history_list_response';
import BudgetHistoryService from '../service/budget_history_list_service';

export function useBudgetHistoryList(
  page: number,
  size: number,
  year: number,
  month: number,
  onSuccess: (data: HistoryBudgetListResponse) => void
) {
  const selector = useSelector((app: AppStore) => app.user);

  async function getUserBudgets(
    userId: string,
    page: number,
    size: number,
    year: number,
    month: number
  ) {
    const service = new BudgetHistoryService();
    const response = await service.getBudgetHistoryList(
      userId,
      page,
      size,
      month + 1,
      year
    );
    return response.data;
  }

  const { isLoading, error, isFetching, isError, data } = useQuery<
    HistoryBudgetListResponse,
    AxiosError<ApiError>
  >(['userHistoryBudgetList', selector.userId, page, size, month, year], {
    queryFn: () => getUserBudgets(selector.userId, page, size, year, month),
    retry: 0,
    onSuccess(data) {
      console.log(data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log(error.code);
    },
    keepPreviousData: true,
  });

  return {
    budgetsLoading: isLoading,
    budgetsHasError: isError,
    budgetsError: error,
    budgetHistoryList: data,
    budgetFetching: isFetching,
  };
}
