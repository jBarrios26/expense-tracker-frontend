import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import CategoryListService from '../service/category_list_service';
import { CategoryListResponse } from '../model/category_list_response';

export function useUserCategories() {
  const selector = useSelector((app: AppStore) => app.user);

  async function getUserCategories(userId: string) {
    const service = new CategoryListService();
    return await service.getUserCategories(userId);
  }

  const { data, isLoading, error, isError } = useQuery<
    CategoryListResponse,
    AxiosError<ApiError>
  >(
    ['userCategoriesList', selector.userId],
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
