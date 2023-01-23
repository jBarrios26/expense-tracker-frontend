import React, { useRef } from 'react';
import ErrorIcon from '../../assets/report_problem.svg';
import CloseIcon from '../../assets/close.svg';
import { useOutsideInteraction } from '../../hooks/useOutsideInteraction';
export interface ErrorSnackBarInterface {
  message?: string;
  isActive: boolean;
  onClose: () => void;
}

const ErrorSnackBar: React.FC<ErrorSnackBarInterface> = ({
  message,
  onClose,
  isActive,
}) => {
  const snackRef = useRef(null);
  const clickOutsideHandler = useOutsideInteraction(snackRef, () => onClose());
  return (
    <div
      tabIndex={0}
      onBlur={onClose}
      ref={snackRef}
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-primary-red py-3 px-4 ${
        isActive ? ' visible opacity-100' : 'invisible opacity-0'
      }`}
      style={{
        transition: isActive
          ? 'visibility 0s linear 0s, opacity 300ms'
          : 'visibility 0s linear 300ms, opacity 300ms',
      }}
    >
      <div className="flex items-center gap-4 " ref={snackRef}>
        <img src={ErrorIcon}></img>
        <span className="text-base text-white-text">{message}</span>
        <button onClick={onClose} type="button" className="appearance-none p-0">
          <img src={CloseIcon}></img>
        </button>
      </div>
    </div>
  );
};

export default ErrorSnackBar;
