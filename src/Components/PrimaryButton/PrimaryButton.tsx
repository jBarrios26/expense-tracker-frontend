import React from 'react';
export interface PrimaryButtonInterface {
  name: string;
  type: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonInterface> = ({ name, onClick }) => {
  return (
    <button
      className=" w-full rounded bg-primary-blue py-2 px-7 text-white-text"
      type="submit"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default PrimaryButton;
