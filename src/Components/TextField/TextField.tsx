import React from 'react';
import './tailwind.css';
import { UseFormRegisterReturn } from 'react-hook-form';
export interface TextFieldInterface {
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  id: string;
  register: UseFormRegisterReturn;
}

const TextField: React.FC<TextFieldInterface> = ({
  label,
  hint,
  type,
  id,
  register,
  error,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className={`
        relative w-full rounded-lg border-2 border-solid  bg-dark-blue-custom focus:font-normal ${
          error !== undefined ? 'border-red-500' : 'border-white-text'
        }`}
      >
        <input
          id={id}
          type={type}
          placeholder="a"
          className="block h-full w-full appearance-none bg-transparent px-4 py-2 text-base placeholder:text-transparent focus:border-none focus:outline-none focus:ring-0"
          {...register}
        />
        <label className="absolute top-2 z-[1]  bg-dark-blue-custom px-4 py-0 text-base">
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
};

export default TextField;
