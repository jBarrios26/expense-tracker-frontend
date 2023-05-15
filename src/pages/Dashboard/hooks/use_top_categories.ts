import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import DashboardService from '../service/dashboard_service';
import { TopCategoriesResponse } from '../models/top_categories_response';

export function useTopCategories() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getTopCategories(userId: string) {
    const service = new DashboardService();
    return await service.getTopCategories(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    TopCategoriesResponse,
    AxiosError<ApiError>
  >(
    ['topCategories', selector.userId],
    () => getTopCategories(selector.userId),
    {
      retry: 0,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  return { categories: data, isLoading, error, isError };
}
