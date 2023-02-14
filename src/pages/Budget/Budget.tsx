import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import BudgetInfo from './components/BudgetInfo/BudgetInfo';
import { useDispatch } from 'react-redux';
import { modifyBudget, resetBudget } from '../../redux/states/budget';
import { useBudget } from './hooks/useBudget';
import { BudgetCategories } from '../../model/budget';
import LoaderOverlay from '../../Components/LoaderOverlay/LoaderOverlay';
import { BudgetExpenseTable } from './components/BudgetExpenseTable';

export function BudgetDetail() {
  const { budgetId } = useParams();
  const dispatch = useDispatch();
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
          id: data.id,
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

  const navigate = useNavigate();
  return (
    <div className="p-6">
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
      <BudgetExpenseTable
        expenses={[
          {
            expenseAmount: 100,
            expenseName: 'Manga',
            expenseDate: new Date(),
            expenseCategory: { color: '#5a1afa', name: 'Manga' },
            id: '1',
          },
        ]}
      ></BudgetExpenseTable>
    </div>
  );
}

export default BudgetDetail;
