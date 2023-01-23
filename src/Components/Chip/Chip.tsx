import React, { ReactNode } from 'react';
import { classNames } from '../../util/classnames';
export interface ChipInterface {
  children: ReactNode;
  color: string;
}

function Chip({ children, color }: ChipInterface) {
  return (
    <div
      className={classNames(`max-w-fit rounded-full py-1 px-5`)}
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
}

export default Chip;
