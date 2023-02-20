import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import BudgetInfo from './components/BudgetInfo/BudgetInfo';
import { useDispatch, useSelector } from 'react-redux';
import { modifyBudget, resetBudget } from '../../redux/states/budget';
import { useBudget } from './hooks/useBudget';
import { BudgetCategories } from '../../model/budget';
import LoaderOverlay from '../../Components/LoaderOverlay/LoaderOverlay';
import { BudgetExpenseTable } from './components/BudgetExpenseTable';
import { useBudgetExpenses } from './hooks/useBudgetExpenses';
import { AppStore } from '../../redux/store';
import { ExpenseRow } from './components/BudgetExpenseTable/BudgetExpenseTable';
import { modifyBudgetExpenseList } from '../../redux/states/budget_expense_list';
import { PaginationState } from '@tanstack/react-table';
import { OutlineButton } from '../../Components/OutlineButton';
import { FloatingButton } from '../../Components/FloatingButton';

export function BudgetDetail() {
  const { budgetId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    dispatch(modifyBudget({ id: budgetId }));

    return () => {
      dispatch(resetBudget());
    };
  }, [dispatch, budgetId]);

  const { budget, budgetError, budgetHasError, budgetIsLoading } = useBudget(
    (data) => {
      dispatch(
        modifyBudget({
          id: data.budgetId,
          name: data.name,
          creationDate: data.creationDate,
          categories: data.categories.map((category) => {
            return {
              id: category.id,
              name: category.name,
              color: category.color,
              currentSpending: category.currentSpending,
              limit: category.limit,
            } as BudgetCategories;
          }),
          description: data.description,
          totalSpending: data.totalSpending,
          budgetLimit: data.budgetLimit,
        })
      );
    }
  );

  const {
    expenseList,
    expenseListError,
    expenseListHasError,
    expenseListIsLoading,
  } = useBudgetExpenses(10, pageIndex, (data) => {
    dispatch(modifyBudgetExpenseList(data.pagination));
  });
  return (
    <div className="block p-6">
      <button
        type="button"
        className=" mb-2 flex items-center gap-1 text-lg text-white-text"
        onClick={() => {
          navigate('/home/budget/');
        }}
      >
        <MdArrowBack size={32} /> Back
      </button>
      <LoaderOverlay isLoading={budgetIsLoading}>
        <BudgetInfo
          name={budget?.name ?? ''}
          description={budget?.description ?? ''}
          totalSpending={budget?.totalSpending ?? 0.0}
          budgetLimit={budget?.budgetLimit ?? 0.0}
          creationDate={
            new Date(budget?.creationDate ?? new Date()) ?? new Date()
          }
          categories={budget?.categories ?? []}
        ></BudgetInfo>
      </LoaderOverlay>
      <div className="flex items-center justify-end py-4">
        <span className="hidden grow-0 md:block">
          <OutlineButton
            name={'Create budget'}
            type={'button'}
            onClick={() => {
              console.log('create');
            }}
          ></OutlineButton>
        </span>
        <span className="fixed bottom-3 right-3 grow-0 md:hidden">
          <FloatingButton
            onClick={() => {
              console.log('create');
            }}
          >
            <MdAdd size={32} />
          </FloatingButton>
        </span>
      </div>
      <LoaderOverlay isLoading={expenseListIsLoading}>
        <BudgetExpenseTable
          expenses={
            expenseList?.expenseList.map((expense) => {
              console.log(expense);

              return {
                expenseDate: new Date(expense.dateOfExpense),
                expenseAmount: expense.amount,
                expenseName: expense.name,
                id: expense.id,
                expenseCategory: {
                  name: expense.category.name,
                  color: expense.category.color,
                },
              } as ExpenseRow;
            }) ?? ([] as ExpenseRow[])
          }
          pages={expenseList?.pagination.numOfPages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </LoaderOverlay>
    </div>
  );
}

export default BudgetDetail;
