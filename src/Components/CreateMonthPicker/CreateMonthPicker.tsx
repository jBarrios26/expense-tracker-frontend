import React from 'react';
import { useDropdownMenu } from 'react-overlays';
import { classNames } from '../../util/classnames';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

interface CreateMonthPickerMenuProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
}

function CreateMonthPickerMenu({
  defaultMonth,
  defaultYear,
  onMonthChange,
  onYearChange,
}: CreateMonthPickerMenuProps) {
  const [menuProps, { show }] = useDropdownMenu({
    flip: true,
    offset: [0, 12],
  });
  return (
    <div
      {...menuProps}
      className={classNames(
        'absolute left-0 w-full rounded-lg  bg-dark-gray shadow-xl',
        show ? 'block' : 'hidden'
      )}
    >
      <CreateMonthPicker
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
        defaultMonth={defaultMonth}
        defaultYear={defaultYear}
      ></CreateMonthPicker>
    </div>
  );
}

interface CreateMonthPickerProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
}

function CreateMonthPicker({
  onMonthChange,
  onYearChange,
  defaultMonth,
  defaultYear,
}: CreateMonthPickerProps) {
  return (
    <div className="flex w-full flex-col gap-3 ">
      <div className="flex items-center justify-center gap-5">
        <button onClick={() => onMonthChange(defaultYear + 1)}>
          <MdArrowLeft size={32} />
        </button>
        <span>{defaultYear}</span>
        <button>
          <MdArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default CreateMonthPickerMenu;
