import React, { useMemo } from 'react';
import { Dropdown } from 'react-overlays';
import MonthPickerMenu from '../MonthPickerMenu/MonthPickerMenu';
import { ToggleMonthPicker } from '../ToggleMonthPicker';

interface MonthPickerDropdownProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
  show: boolean;
  onToggle: (nextShow: boolean) => void;
}

export default function MonthPickerDropdown({
  onMonthChange,
  onYearChange,
  show,
  defaultMonth,
  defaultYear,
  onToggle,
}: MonthPickerDropdownProps) {
  const selectedRange = useMemo(() => {
    const date = Date.parse(`${defaultYear}-${defaultMonth}-01`);
    return new Date(date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  }, [defaultMonth, defaultYear]);

  return (
    <Dropdown
      show={show}
      onToggle={onToggle}
      itemSelector="button:not(:disabled)"
      alignEnd={false}
    >
      <div className="relative z-[1000] inline-block w-full ">
        <ToggleMonthPicker id="example-toggle" selectedRange={selectedRange} />
        <MonthPickerMenu
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
          defaultMonth={defaultMonth}
          defaultYear={defaultYear}
        />
      </div>
    </Dropdown>
  );
}
