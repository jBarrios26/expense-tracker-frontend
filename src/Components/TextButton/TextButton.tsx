import React, { ReactNode } from 'react';
export interface TextButtonInterface {
  name: string;
  children?: ReactNode;
  color?: string;
  hoverColor?: string;
  onClick: () => void;
}

const TextButton: React.FC<TextButtonInterface> = ({
  name,
  children,
  onClick,
  color,
  hoverColor,
}) => {
  return (
    <button
      type="button"
      className={`relative flex cursor-pointer items-center border-none bg-inherit px-0 pt-3 pb-1 text-base ${
        color ?? 'text-white-text'
      } hover:text-primary-blue hover:after:absolute hover:after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-primary-blue`}
      onClick={onClick}
    >
      {children ?? name}
    </button>
  );
};

export default TextButton;
