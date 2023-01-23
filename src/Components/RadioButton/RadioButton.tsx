import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface RadioButtonInterface {
  value: string;
  label: string;
  register?: UseFormRegisterReturn;
}

const RadioButton: React.FC<RadioButtonInterface> = ({
  value,
  label,
  register,
}) => {
  return (
    <div className="mr-1 flex items-center">
      <input
        type="radio"
        id={value}
        value={value}
        className="  m-0 h-6 w-6 border-white-text bg-bg-blue text-base  checked:bg-150%  checked:text-input-blue"
        {...register}
      />
      <p className={`ml-2 align-middle `}>{label} </p>
    </div>
  );
};

export default RadioButton;
