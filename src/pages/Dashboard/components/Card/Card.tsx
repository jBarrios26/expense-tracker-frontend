import React, { ReactNode } from 'react';
interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return <div className=" bg-dark-blue-custom py-2 px-4">{children}</div>;
}
