import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ApiError } from '../../../common/model/error/api_error';
import { AppStore } from '../../../redux/store';
import { CreateExpenseResponse } from '../model/create_expense_response';
import CreateExpenseService from '../service/create_expense_service';
import { queryClient } from '../../../main';
import { CategoryListResponse } from '../../CategoryList/model/category_list_response';

export interface NewExpenseData {
  name: string;
  amount: number;
  date: Date;
  category: string;
  budgetId: string;
}

export function useAddExpense(
  onSuccess: (data: CreateExpenseResponse) => void,
  page: number,
  size: number
) {
  const selector = useSelector((app: AppStore) => app.budget);
  const { budgetId } = useParams();

  async function addExpense(
    name: string,
    date: Date,
    budget: string,
    category: string,
    amount: number
  ) {
    const service = new CreateExpenseService();
    return (await service.addExpense(name, date, amount, budget, category))
      .data;
  }

  const { mutate, isLoading, error, isError } = useMutation<
    CreateExpenseResponse,
    AxiosError<ApiError>,
    NewExpenseData
  >(
    ['create-expense'],
    (data) =>
      addExpense(
        data.name,
        data.date,
        data.budgetId,
        data.category,
        data.amount
      ),
    {
      retry: 0,
      onSuccess: async (data) => {
        console.info(data);

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

  return { addExpense: mutate, isLoading, error, isError };
}
