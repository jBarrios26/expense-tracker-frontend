import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import BudgetService from '../service/budget_service';
import { ExpenseList } from '../model/expense_list';
import { Pagination } from '../../../common/model/pagination';

export function useBudgetExpenses(
  size: number,
  page: number,
  onSuccess: (data: ExpenseList) => void
) {
  const selector = useSelector((app: AppStore) => app.budget);
  const { budgetId } = useParams();

  async function getBudget(
    budgetId: string | undefined,
    size: number,
    page: number
  ) {
    if (budgetId === undefined || budgetId.length === 0) {
      return {
        pagination: {
          currentPage: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          numOfPages: 0,
        } as Pagination,
        expenseList: [],
      } as ExpenseList;
    }
    const service = new BudgetService();
    const response = await service.getBudgetExpenses(budgetId, size, page);
    return response.data;
  }

  const { isLoading, error, isError, data } = useQuery<
    ExpenseList,
    AxiosError<ApiError>
  >(['budgetItemExpenses', budgetId, size, page - 1], {
    queryFn: () => getBudget(budgetId, size, page),
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
    expenseListIsLoading: isLoading,
    expenseListHasError: isError,
    expenseListError: error,
    expenseList: data,
  };
}
