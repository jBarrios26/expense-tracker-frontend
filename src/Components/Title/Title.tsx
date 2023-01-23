import React, { ReactNode } from 'react';
export interface TitleInterface {
  children: ReactNode;
}

const Title: React.FC<TitleInterface> = (props) => {
  return (
    <h1 className=" break-words text-2xl font-bold text-white-text lg:text-3xl xl:text-4xl">
      {props.children}
    </h1>
  );
};

export default Title;
