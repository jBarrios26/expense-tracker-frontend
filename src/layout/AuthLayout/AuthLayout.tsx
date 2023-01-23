import React from 'react';
import { MdAutoGraph } from 'react-icons/md';
import { Subtitle } from '../../Components/Subtitle';
import { Title } from '../../Components/Title';
import RegularText from '../../Components/RegularText/RegularText';

export interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-screen lg:flex lg:items-stretch ">
      <div className="lg: flex h-36 flex-col items-start justify-center bg-dark-blue-custom px-4 md:items-start lg:h-auto lg:flex-1 lg:items-start lg:justify-between lg:py-24 lg:pl-24">
        <div className="flex items-center justify-between gap-4 ">
          <MdAutoGraph size={70} />
          <Title> {title}</Title>
        </div>
        <div className=" hidden pr-28 lg:block">
          <Subtitle> Start tracking your expenses now </Subtitle>
          <RegularText
            upperPadding
            text="Track your expenses monthly and get reports and statistic about the way you spend your precious money"
          />
        </div>
      </div>
      <main className="h-auto  lg:flex-1">{children}</main>
    </div>
  );
};

export default AuthLayout;
