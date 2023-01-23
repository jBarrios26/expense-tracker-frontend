import React, { useState } from 'react';
import { RadioButton } from '../RadioButton';
import { UseFormRegisterReturn } from 'react-hook-form';
export interface RadioGroupInterface {
  options: Array<string>;
  labels?: Array<string>;
  register?: UseFormRegisterReturn;
}

const RadioGroup: React.FC<RadioGroupInterface> = ({
  options,
  labels,
  register,
}) => {
  const [optionSelected, setOptionSelected] = useState(options[0]);

  return (
    <div className="flex flex-wrap items-center gap-2 px-1">
      {options.map((option, index) => {
        return (
          <RadioButton
            key={index}
            value={option}
            label={`${labels?.at(index) ?? option} `}
            register={register}
          />
        );
      })}
    </div>
  );
};

export default RadioGroup;
