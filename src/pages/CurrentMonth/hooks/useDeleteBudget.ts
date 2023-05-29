import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { queryClient } from '../../../main';
import CurrentMonthBudgetService from '../service/current_month_service';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../redux/store';
export interface DeleteBudgetData {
  id: string;
}

export function useDeleteBudget(
  onSuccess: (data: boolean) => void,
  page: number,
  size: number
) {
  const selector = useSelector((app: AppStore) => app.user);

  async function deleteBudget(budgetId: string) {
    const service = new CurrentMonthBudgetService();
    return (await service.deleteUserBudget(budgetId)).data;
  }

  const { mutate, isLoading, error, isError } = useMutation<
    boolean,
    AxiosError<ApiError>,
    DeleteBudgetData
  >(['delete-budget', page, size], (data) => deleteBudget(data.id), {
    retry: 0,
    onSuccess: async (data) => {
      console.info(data);

      await queryClient.cancelQueries({
        queryKey: ['userBudgetList', selector.userId, page, size],
      });

      onSuccess(data);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['userBudgetList', selector.userId, page, size],
      });
    },
  });

  return { deleteBudget: mutate, isLoading, error, isError };
}
