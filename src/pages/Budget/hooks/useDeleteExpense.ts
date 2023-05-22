import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { queryClient } from '../../../main';
import BudgetService from '../service/budget_service';

export interface DeleteExpenseData {
  id: string;
}

export function useDeleteExpense(
  onSuccess: (data: boolean) => void,
  page: number,
  size: number
) {
  const { budgetId } = useParams();

  async function deleteExpense(expenseId: string) {
    const service = new BudgetService();
    return (await service.deleteExpense(expenseId)).data;
  }

  const { mutate, isLoading, error, isError } = useMutation<
    boolean,
    AxiosError<ApiError>,
    DeleteExpenseData
  >(
    ['delete-expense', page, size, budgetId],
    (data) => deleteExpense(data.id),
    {
      retry: 0,
      onSuccess: async (data) => {
        console.info(data);

        await queryClient.cancelQueries({
          queryKey: ['budgetItemExpenses', budgetId, size, page - 1],
        });
        await queryClient.cancelQueries({
          queryKey: ['budgetItem', budgetId],
        });
        onSuccess(data);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['budgetItem', budgetId],
        });
        await queryClient.invalidateQueries({
          queryKey: ['budgetItemExpenses', budgetId, size, page - 1],
        });
      },
    }
  );

  return { deleteExpense: mutate, isLoading, error, isError };
}
