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
  onSuccess: (data: CreateExpenseResponse) => void
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
        console.log(data);
        await queryClient.cancelQueries({
          queryKey: ['userCategoriesList'],
        });
      },
      onMutate: async (newCategory) => {
        // Cancel any outgoing refetches
        // (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries({
          queryKey: ['userCategoriesList', selector.id],
        });

        // Snapshot the previous value
        const previousCategories =
          queryClient.getQueryData<CategoryListResponse>([
            'userCategoriesList',
            selector.id,
          ]);

        // Optimistically update to the new value
        queryClient.setQueryData<CategoryListResponse>(
          ['userCategoriesList', selector.id],
          {
            success: previousCategories?.success ?? false,
            categories:
              previousCategories === undefined
                ? []
                : previousCategories?.categories.concat([
                    {
                      id: 'aaaaa',
                      name: newCategory.name,
                      color: newCategory.name,
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
          ['userCategoriesList', selector.id],
          (
            context as {
              previousCategories: CategoryListResponse;
            }
          ).previousCategories
        );
      },
      // Always refetch after error or success:
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['userCategoriesList', selector.id],
        });
      },
    }
  );

  return { createCategory: mutate, isLoading, error, isError };
}
