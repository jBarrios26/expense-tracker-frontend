import React from 'react';
import { Modal } from 'react-overlays';
import { CreateExpense } from '../../../CreateExpense';
import { BudgetItemCategory } from '../../model/budget_item';

export interface CreateExpenseModalProps {
  isOpen: boolean;
  toggle: (value: boolean) => void;
  budgetCategories: BudgetItemCategory[];
  page: number;
  size: number;
}

function CreateExpenseModal({
  isOpen,
  toggle,
  budgetCategories,
  page,
  size,
}: CreateExpenseModalProps) {
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
        <CreateExpense
          budgetCategories={budgetCategories}
          page={page}
          size={size}
          onComplete={() => toggle(!isOpen)}
        />
      </div>
    </Modal>
  );
}

export default CreateExpenseModal;
