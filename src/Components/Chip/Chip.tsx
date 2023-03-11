import React, { ReactNode } from 'react';
import { classNames } from '../../util/classnames';
export interface ChipInterface {
  children: ReactNode;
  color: string;
}

function Chip({ children, color }: ChipInterface) {
  return (
    <div
      className={classNames(
        `max-w-fit rounded-full py-1 px-1 text-sm sm:px-2 md:px-3 md:text-lg lg:px-5 lg:text-xl `
      )}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}

export default Chip;
