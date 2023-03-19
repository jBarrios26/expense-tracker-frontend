import React, { useMemo } from 'react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import capitalize from '../../util/capitalize';
import { classNames } from '../../util/classnames';

interface MonthPickerProps {
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  defaultMonth: number;
  defaultYear: number;
}

function MonthPicker({
  onMonthChange,
  onYearChange,
  defaultMonth,
  defaultYear,
}: MonthPickerProps) {
  const months: Array<string> = useMemo(() => {
    return [
      capitalize(
        new Date(2000, 0).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 1).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 2).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 3).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 4).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 5).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 6).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 7).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 8).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 9).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 10).toLocaleString('default', { month: 'short' })
      ),
      capitalize(
        new Date(2000, 11).toLocaleString('default', { month: 'short' })
      ),
    ];
  }, []);

  return (
    <div className="flex w-full flex-col gap-3 p-4 ">
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={() => onYearChange(defaultYear - 1)}
          className="hover:text-primary-blue/80"
        >
          <MdArrowLeft size={48} />
        </button>
        <span className=" text-xl">{defaultYear}</span>
        <button
          onClick={() => onYearChange(defaultYear + 1)}
          className="hover:text-primary-blue/80"
        >
          <MdArrowRight size={48} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => {
          console.log(month, index);

          return (
            <button
              key={index}
              className={classNames(
                ' flex items-center justify-center rounded-sm bg-zinc-500 p-2 hover:bg-zinc-800',
                index == defaultMonth ? 'bg-primary-blue/50' : ''
              )}
              onClick={() => onMonthChange(index)}
            >
              {month}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MonthPicker;
