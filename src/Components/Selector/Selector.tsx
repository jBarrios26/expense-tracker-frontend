import React from 'react';
import './tailwind.css';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../../util/classnames';
export interface SelectorInterface {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  id: string;
  register: UseFormRegisterReturn;
  options: Array<SelectorOption>;
}

export interface SelectorOption {
  label: string;
  value: string;
  color?: string;
}

function Selector({
  name,
  label,
  hint,
  error,
  type,
  id,
  register,
  options,
}: SelectorInterface) {
  return (
    <div className="flex w-full flex-col">
      <div
        className={`relative w-full rounded-lg border-2 border-solid bg-transparent hover:border-primary-blue  focus:font-normal${
          error !== undefined ? 'border-red-500' : 'border-white-text'
        }`}
      >
        <select
          id={id}
          {...register}
          placeholder="a"
          defaultValue={''}
          className={classNames(
            'block h-full w-full appearance-none bg-dark-blue-custom px-4 py-2 text-base text-white-text placeholder:text-transparent focus:border-none focus:outline-none focus:ring-0'
          )}
        >
          <option value="">None</option>
          {options.map((selectOption, index) => {
            return (
              <option key={index} value={selectOption.value}>
                {selectOption.label}
              </option>
            );
          })}
        </select>
        <label className="absolute top-2 z-[1] bg-dark-blue-custom px-4 py-0 text-base text-white-text">
          {label}
        </label>
      </div>
      {error !== undefined ? (
        <p className="px-4 py-2 text-xs text-red-600"> {error}</p>
      ) : hint !== undefined ? (
        <p className="px-4 py-2 text-xs text-grey ">{hint}</p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Selector;
