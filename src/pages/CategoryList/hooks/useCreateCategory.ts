import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import { CategoryListResponse } from '../model/category_list_response';
import { CreateCategoryResponse } from '../model/create_category_response';
import CategoryListService from '../service/category_list_service';

export function useCreateCategory() {
  const selector = useSelector((app: AppStore) => app.user);
  const queryClient = useQueryClient();

  async function createCategory(userId: string, color: string, name: string) {
    const service = new CategoryListService();
    return await service.createCategory(userId, name, color);
  }

  const { mutate, isLoading, error, isError } = useMutation<
    CreateCategoryResponse,
    AxiosError<ApiError>,
    NewCategoryData
  >(
    ['createCategory', selector.userId],
    (data) => createCategory(selector.userId, data.color, data.name),
    {
      retry: 0,
      onSuccess: async (data) => {
        console.log(data);
        await queryClient.cancelQueries({
          queryKey: ['userCategoriesList', selector.userId],
        });
      },
      onMutate: async (newCategory) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ['userCategoriesList', selector.userId],
        });

        // Snapshot the previous value
        const previousCategories =
          queryClient.getQueryData<CategoryListResponse>([
            'userCategoriesList',
            selector.userId,
          ]);

        // Optimistically update to the new value
        queryClient.setQueryData<CategoryListResponse>(
          ['userCategoriesList', selector.userId],
          {
            success: previousCategories?.success ?? false,
            categories:
              previousCategories === undefined
                ? []
                : previousCategories?.categories.concat([
                    {
                      id: 'aaaaa',
                      name: newCategory.name,
                      color: newCategory.color,
                    },
                  ]),
          }
        );

        // Return a context with the previous and new todo
        return { previousCategories, newCategory };
      },
      // If the mutation fails, use the context we returned above
      onError: (err, newTodo, context) => {
        queryClient.setQueryData(
          ['userCategoriesList', selector.userId],
          (
            context as {
              previousCategories: CategoryListResponse;
              newCategory: NewCategoryData;
            }
          ).previousCategories
        );
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['userCategoriesList', selector.userId],
        });
      },
    }
  );

  return { createCategory: mutate, isLoading, error, isError };
}

export interface NewCategoryData {
  name: string;
  color: string;
}
