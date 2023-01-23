import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import CreateBudgetService from '../service/create_budget_service';
import { Categories } from '../model/categories';

export function useCategories() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getUserCategories(userId: string) {
    const service = new CreateBudgetService();
    return await service.getUserCategories(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    Categories,
    AxiosError<ApiError>
  >(
    ['budgetCategoriesCreate', selector.userId],
    () => getUserCategories(selector.userId),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return { categories: data, isLoading, error, isError };
}
