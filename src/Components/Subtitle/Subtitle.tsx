import React from 'react';
export interface SubtitleInterface {
  children: React.ReactNode;
}

const Subtitle: React.FC<SubtitleInterface> = ({ children }) => {
  return (
    <h2 className=" text-xl font-bold text-white-text lg:text-2xl xl:text-3xl ">
      {children}
    </h2>
  );
};

export default Subtitle;
