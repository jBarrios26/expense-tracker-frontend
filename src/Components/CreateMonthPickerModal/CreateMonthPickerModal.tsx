import React, { useMemo } from 'react';
import { Dropdown, Modal, useDropdownToggle } from 'react-overlays';
import CreateMonthPicker from '../CreateMonthPicker';
import CreateMonthPickerMenu from '../CreateMonthPicker/CreateMonthPicker';

interface CreateMonthPickerDropdownProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
  show: boolean;
  onToggle: (nextShow: boolean) => void;
}

export default function CreateMonthPickerDropdown({
  onMonthChange,
  onYearChange,
  show,
  defaultMonth,
  defaultYear,
  onToggle,
}: CreateMonthPickerDropdownProps) {
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
    >
      <div className="relative z-[1000] grid ">
        <ToggleMonthPicker id="example-toggle" selectedRange={selectedRange} />
        <CreateMonthPickerMenu
          onYearChange={onYearChange}
          onMonthChange={onMonthChange}
          defaultMonth={defaultMonth}
          defaultYear={defaultYear}
        />
      </div>
    </Dropdown>
  );
}

interface ToggleMonthPickerProps {
  selectedRange?: string;
  id: string;
}

function ToggleMonthPicker({ selectedRange, id }: ToggleMonthPickerProps) {
  const [props] = useDropdownToggle();
  return (
    <div className="rounded-lg  bg-dark-blue-custom">
      <button
        className="rounded-lg px-2 text-sm md:w-full"
        {...props}
        id={id}
        type="button"
      >
        {selectedRange ?? 'Nulls'}
      </button>
    </div>
  );
}
