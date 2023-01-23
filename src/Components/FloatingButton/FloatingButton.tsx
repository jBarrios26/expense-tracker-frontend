import React, { ReactNode } from 'react';
export interface FloatingButtonInterface {
  children: ReactNode;
  onClick?: () => void;
}

function FloatingButton({ children, onClick }: FloatingButtonInterface) {
  return (
    <button
      className="rounded-full bg-primary-blue p-5"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default FloatingButton;
