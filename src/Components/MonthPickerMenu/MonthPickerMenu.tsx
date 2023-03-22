import React from 'react';
import { useDropdownMenu } from 'react-overlays';
import { classNames } from '../../util/classnames';
import { MonthPicker } from '../MonthPicker';

interface MonthPickerMenuProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
}

function MonthPickerMenu({
  defaultMonth,
  defaultYear,
  onMonthChange,
  onYearChange,
}: MonthPickerMenuProps) {
  const [menuProps, { show }] = useDropdownMenu({
    flip: true,
    offset: [0, 8],
  });
  return (
    <div
      {...menuProps}
      className={classNames(
        'absolute left-0 w-full rounded-lg  bg-dark-gray p-2 shadow-xl',
        show ? 'block' : 'hidden'
      )}
    >
      <MonthPicker
        onYearChange={onYearChange}
        onMonthChange={onMonthChange}
        defaultMonth={defaultMonth}
        defaultYear={defaultYear}
      ></MonthPicker>
    </div>
  );
}

export default MonthPickerMenu;
