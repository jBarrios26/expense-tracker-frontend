import React from 'react';
import { useDropdownToggle } from 'react-overlays';
import capitalize from '../../util/capitalize';

interface ToggleMonthPickerProps {
  selectedRange?: string;
  id: string;
}

function ToggleMonthPicker({ selectedRange, id }: ToggleMonthPickerProps) {
  const [props] = useDropdownToggle();
  return (
    <div className="rounded-lg  bg-dark-blue-custom">
      <button
        className="flex w-full  items-center justify-center rounded-lg p-2 text-lg font-bold"
        {...props}
        id={id}
        type="button"
      >
        {capitalize(selectedRange ?? '')}
      </button>
    </div>
  );
}

export default ToggleMonthPicker;
