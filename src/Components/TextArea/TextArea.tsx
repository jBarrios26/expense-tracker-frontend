import React, { useRef } from 'react';
import './tailwind.css';
import { UseFormRegisterReturn } from 'react-hook-form';
export interface TextAreaInterface {
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  id: string;
  register: UseFormRegisterReturn;
}

function TextArea({
  label,
  hint,
  type,
  id,
  register,
  error,
}: TextAreaInterface) {
  return (
    <>
      <div
        className={`
        relative w-full rounded-lg border-2 border-solid bg-dark-blue-custom focus:font-normal ${
          error !== undefined ? 'border-red-500' : 'border-white-text'
        }`}
      >
        <textarea
          id={id}
          placeholder="a"
          rows={3}
          className="block h-full w-full resize-y appearance-none bg-transparent px-4 py-2 text-base placeholder:text-transparent focus:border-none focus:outline-none focus:ring-0"
          {...register}
        />
        <label className="absolute top-2 z-[-1] bg-dark-blue-custom px-4 py-0 text-base">
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
    </>
  );
}

export default TextArea;
