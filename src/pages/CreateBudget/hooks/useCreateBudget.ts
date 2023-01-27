import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import CreateBudgetService from '../service/create_budget_service';
import { CreateBudgetBody } from '../CreateBudget';
import { CreateBudgetResponse } from '../model/create_budget_response';

export function useCreateBudget(onSucess?: () => void, onError?: () => void) {
  const selector = useSelector((app: AppStore) => app.user);
  const budgetListPaginationSelecto = useSelector(
    (app: AppStore) => app.budgetList
  );
  const queryClient = useQueryClient();

  async function createBudget(createBudget: CreateBudgetBody, userId: string) {
    const service = new CreateBudgetService();
    return await service.createBudget(
      new Date(),
      createBudget.name,
      createBudget.description,
      createBudget.amount,
      userId,
      createBudget.categories
    );
  }

  const { isLoading, error, isError, mutate } = useMutation<
    CreateBudgetResponse,
    AxiosError<ApiError>,
    CreateBudgetBody
  >(
    ['createBudget', selector.userId],
    (createBudgetBody: CreateBudgetBody) =>
      createBudget(createBudgetBody, selector.userId),
    {
      retry: 0,
      onSuccess: async (data) => {
        if (onSucess !== undefined) onSucess();
        await queryClient.cancelQueries({
          queryKey: [
            'userBudgetList',
            selector.userId,
            budgetListPaginationSelecto.pagination.currentPage,
            10,
          ],
        });
      },
      onError: (data) => {
        if (onError !== undefined) onError();
      },
    }
  );

  return {
    isLoadingCreate: isLoading,
    errorCreate: error,
    isErrorCreate: isError,
    mutate,
  };
}
