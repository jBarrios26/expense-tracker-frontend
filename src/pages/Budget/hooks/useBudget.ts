import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import { BudgetItem } from '../model/budget_item';
import BudgetService from '../service/budget_service';
import { BudgetCategories } from '../../../model/budget';

export function useBudget(onSuccess: (data: BudgetItem) => void) {
  const selector = useSelector((app: AppStore) => app.budget);
  const { budgetId } = useParams();

  async function getBudget(budgetId: string | undefined) {
    if (budgetId === undefined || budgetId.length === 0) {
      return {
        budgetId: '',
        name: '',
        creationDate: new Date(),
        categories: [] as BudgetCategories[],
        description: '',
        totalSpending: 0,
        budgetLimit: 0,
      } as BudgetItem;
    }
    const service = new BudgetService();
    const response = await service.getBudget(budgetId);
    return response.data;
  }

  const { isLoading, error, isError, data } = useQuery<
    BudgetItem,
    AxiosError<ApiError>
  >(['budgetItem', budgetId], {
    queryFn: () => getBudget(budgetId),
    retry: 0,
    onSuccess(data) {
      console.log(data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log(error.code);
    },
  });

  return {
    budgetIsLoading: isLoading,
    budgetHasError: isError,
    budgetError: error,
    budget: data,
  };
}
