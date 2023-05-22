import React from 'react';
import { Modal } from 'react-overlays';
import { CreateExpense } from '../../../CreateExpense';
import { BudgetItemCategory } from '../../model/budget_item';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import EditExpense from '../../../EditExpense/EditExpense';

export interface EditExpenseModalProps {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  budgetCategories: BudgetItemCategory[];
  page: number;
  size: number;
}

function EditExpenseModal({
  isOpen,
  toggle,
  budgetCategories,
  page,
  size,
}: EditExpenseModalProps) {
  const selector = useSelector(
    (appStore: AppStore) => appStore.budgetExpenseList
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBackdrop = (props: any) => (
    <div
      className="fixed inset-0  z-[1040] bg-grey/30 opacity-90"
      {...props}
    ></div>
  );

  return (
    <Modal
      show={isOpen}
      renderBackdrop={renderBackdrop}
      onHide={() => {
        toggle(!isOpen);
      }}
      className="fixed top-0 left-0 z-[1040]"
    >
      <div className="fixed top-1/2 left-1/2 flex w-full -translate-y-1/2 -translate-x-1/2 justify-center">
        <EditExpense
          budgetCategories={budgetCategories}
          page={page}
          size={size}
          budgetExpense={{
            id: selector.editingBudgetExpense?.id ?? '',
            name: selector.editingBudgetExpense?.name ?? '',
            amount: selector.editingBudgetExpense?.amount ?? 0.0,
            dateOfExpense: new Date(
              selector.editingBudgetExpense?.dateOfExpense ?? ''
            ),
            category: {
              id: selector.editingBudgetExpense?.category?.id ?? '',
              name: '',
              color: '',
            },
          }}
          onComplete={() => toggle(!isOpen)}
        />
      </div>
    </Modal>
  );
}

export default EditExpenseModal;
