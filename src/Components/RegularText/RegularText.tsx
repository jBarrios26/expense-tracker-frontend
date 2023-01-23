import React from 'react';
export interface RegularTextInterface {
  text: string;
  upperPadding: boolean;
}

const RegularText: React.FC<RegularTextInterface> = ({
  text,
  upperPadding,
}) => {
  return (
    <p
      className={`break-words text-lg font-normal text-white-text lg:text-xl xl:text-2xl ${
        upperPadding ? 'pt-3 lg:pt-4 xl:pt-5' : ''
      }`}
    >
      {text}
    </p>
  );
};

export default RegularText;
