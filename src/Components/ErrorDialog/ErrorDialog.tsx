import React, { useState } from 'react';
import { Modal } from 'react-overlays';
import { PrimaryButton } from '../PrimaryButton';
import ErrorIcon from '../../assets/cross_icon.svg';
export interface ErrorDialogInterface {
  title: string;
  subtitle: string;
  isShowing: boolean;
  onDismiss: () => void;
  onAccept?: () => void;
  doubleButton: boolean;
}

const ErrorDialog: React.FC<ErrorDialogInterface> = ({
  title,
  subtitle,
  doubleButton,
  isShowing,
  onAccept,
  onDismiss,
}) => {
  const [open, setOpen] = useState(isShowing);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBackdrop = (props: any) => (
    <div
      className="fixed inset-0  z-[1040] bg-black opacity-50"
      {...props}
    ></div>
  );

  return (
    <Modal
      show={isShowing}
      renderBackdrop={renderBackdrop}
      onHide={() => {
        onDismiss();
      }}
      className="fixed top-0 left-0 z-[1040]"
    >
      <div
        tabIndex={0}
        className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <div className="flex min-h-dialog w-96 min-w-dialog flex-col items-center justify-center gap-6 rounded-2xl bg-dark-gray p-8 text-3xl shadow-3xl  ">
          <img src={ErrorIcon} alt="..." />
          <div>
            <h3 className=" text-center text-xl font-medium leading-8 text-white-text">
              {title}
            </h3>
            <p className="text-center  text-base font-normal text-light-grey">
              {subtitle}
            </p>
          </div>
          <span className="">
            <PrimaryButton
              name={'Accept'}
              type={'button'}
              onClick={() => {
                if (onAccept !== undefined) onAccept();
                onDismiss();
              }}
            ></PrimaryButton>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorDialog;
