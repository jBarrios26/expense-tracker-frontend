import React from 'react';

export interface OutlineButtonInterface {
  name: string;
  type: 'submit' | 'button' | 'reset' | undefined;
  onClick?: () => void;
}

function OutlineButton({ name, type, onClick }: OutlineButtonInterface) {
  return (
    <button
      className=" w-full rounded border-2 border-solid  border-primary-blue  py-2 px-7 text-primary-blue"
      type={type}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default OutlineButton;
