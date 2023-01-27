import React, { ReactNode } from 'react';
export interface PrimaryButtonInterface {
  name?: string;
  type: string;
  onClick?: () => void;
  children?: ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonInterface> = ({
  name,
  onClick,
  children,
}) => {
  return (
    <button
      className=" w-full rounded bg-primary-blue py-2 px-7 text-white-text"
      type="submit"
      onClick={onClick}
    >
      {name ?? children}
    </button>
  );
};

export default PrimaryButton;
