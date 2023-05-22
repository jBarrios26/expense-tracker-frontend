import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAdd, MdArrowBack } from 'react-icons/md';
import BudgetInfo from './components/BudgetInfo/BudgetInfo';
import { useDispatch } from 'react-redux';
import { modifyBudget, resetBudget } from '../../redux/states/budget';
import { useBudget } from './hooks/useBudget';
import { BudgetCategories } from '../../model/budget';
import LoaderOverlay from '../../Components/LoaderOverlay/LoaderOverlay';
import { BudgetExpenseTable } from './components/BudgetExpenseTable';
import { useBudgetExpenses } from './hooks/useBudgetExpenses';
import { ExpenseRow } from './components/BudgetExpenseTable/BudgetExpenseTable';
import { modifyBudgetExpenseList } from '../../redux/states/budget_expense_list';
import { PaginationState, noop } from '@tanstack/react-table';
import { FloatingButton } from '../../Components/FloatingButton';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import { CreateExpenseModal } from './components/CreateExpenseModal';
import { BudgetItemCategory } from './model/budget_item';
import EditExpenseModal from './components/EditExpenseModal';
import { useDeleteExpense } from './hooks/useDeleteExpense';
import { CgSize } from 'react-icons/cg';

export interface BudgetDetailProps {
  isHistoryDetail?: boolean;
}

export function BudgetDetail({ isHistoryDetail = true }: BudgetDetailProps) {
  const { budgetId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

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

  const { budget, budgetIsLoading } = useBudget((data) => {
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
  });
  const { deleteExpense, isLoading } = useDeleteExpense(
    noop,
    pageIndex,
    pageSize
  );

  const { expenseList, expenseListIsLoading } = useBudgetExpenses(
    10,
    pageIndex,
    (data) => {
      dispatch(modifyBudgetExpenseList(data.pagination));
    }
  );

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
        {isHistoryDetail ? (
          <></>
        ) : (
          <span className="hidden grow-0 md:block">
            <PrimaryButton
              type={'button'}
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <MdAdd size={16} /> Add New Expense
              </span>
            </PrimaryButton>
          </span>
        )}
        {isHistoryDetail ? (
          <></>
        ) : (
          <span className="fixed bottom-3 right-3 grow-0 md:hidden">
            <FloatingButton
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
            >
              <MdAdd size={32} />
            </FloatingButton>
          </span>
        )}
      </div>
      <LoaderOverlay isLoading={expenseListIsLoading}>
        <BudgetExpenseTable
          expenses={
            expenseList?.expenseList.map((expense) => {
              return {
                expenseDate: new Date(expense.dateOfExpense),
                expenseAmount: expense.amount,
                expenseName: expense.name,
                id: expense.id,
                expenseCategory: {
                  name: expense.category.name,
                  color: expense.category.color,
                  id: expense.category.id,
                },
              } as ExpenseRow;
            }) ?? ([] as ExpenseRow[])
          }
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={(expenseId: string) => {
            deleteExpense({ id: expenseId });
          }}
          disableActions={isHistoryDetail}
          pages={expenseList?.pagination.numOfPages}
          pagination={pagination}
          setPagination={setPagination}
        />
      </LoaderOverlay>
      <CreateExpenseModal
        budgetCategories={budget?.categories ?? ([] as BudgetItemCategory[])}
        isOpen={isCreateModalOpen}
        toggle={function (value: boolean): void {
          setIsCreateModalOpen(value);
        }}
        page={pageIndex}
        size={pageSize}
      />
      <EditExpenseModal
        budgetCategories={budget?.categories ?? ([] as BudgetItemCategory[])}
        isOpen={isEditModalOpen}
        toggle={function (value: boolean): void {
          setIsEditModalOpen(value);
        }}
        page={pageIndex}
        size={pageSize}
      />
    </div>
  );
}

export default BudgetDetail;
