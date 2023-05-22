import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import { queryClient } from '../../../main';
import { EditExpenseResponse } from '../model/edit_expense_response';
import EditExpenseService from '../service/edit_expense_service';
import { UpdateExpense } from '../model/update_expense';

export interface UpdateExpenseData {
  id: string;
  updateExpense: UpdateExpense;
}

export function useEditExpense(
  onSuccess: (data: EditExpenseResponse) => void,
  page: number,
  size: number,
  id: string
) {
  const { budgetId } = useParams();

  async function addExpense(expenseId: string, updatedExpense: UpdateExpense) {
    const service = new EditExpenseService();
    return (await service.updateExpense(expenseId, updatedExpense)).data;
  }

  const { mutate, isLoading, error, isError } = useMutation<
    EditExpenseResponse,
    AxiosError<ApiError>,
    UpdateExpenseData
  >(['edit-expense', id], (data) => addExpense(data.id, data.updateExpense), {
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
  });

  return { editExpense: mutate, isLoading, error, isError };
}
