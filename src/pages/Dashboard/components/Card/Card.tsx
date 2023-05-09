import React, { ReactNode } from 'react';
import { classNames } from '../../../../util/classnames';

function Card(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={classNames(
        'w-full rounded-lg bg-dark-blue-custom py-5 px-4',
        `${props.className ?? ''}`
      )}
    >
      {props.children}
    </div>
  );
}

export default Card;
