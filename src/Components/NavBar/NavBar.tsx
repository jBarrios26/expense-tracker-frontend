import React, { ReactElement, useState } from 'react';
import Hamburger from 'hamburger-react';
import { CgGirl, CgBoy, CgToday, CgLogOut } from 'react-icons/cg';
import { RiDashboardFill, RiArchiveDrawerFill } from 'react-icons/ri';
import { FaLayerGroup } from 'react-icons/fa';
import { classNames } from '../../util/classnames';
import { NavLink } from 'react-router-dom';

export interface NavBarProps {
  children: ReactElement;
}

function NavBar({ children }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function openMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className=" sticky top-0 z-10 m-0 flex h-20 w-screen items-center justify-between overflow-hidden bg-dark-blue-custom p-4 shadow-md">
        <Hamburger toggled={isOpen} onToggle={openMenu} />
        <div className="flex items-center justify-between gap-1 md:gap-2 lg:gap-3">
          <span className=" text-base font-medium text-white-text md:text-lg lg:text-xl ">
            Jorge Barrios
          </span>
          <span className="text-xl md:text-2xl lg:text-4xl ">
            <CgBoy />
          </span>
        </div>
      </div>
      <div className="relative  h-[calc(100vh-80px)] overflow-y-scroll md:flex md:gap-3">
        <aside
          className={classNames(
            'fixed flex h-5/6 w-full flex-col items-center justify-between border-t-2 border-t-slate-100 bg-dark-blue-custom',
            ' transition-visibility duration-500',
            'md:sticky md:top-0 md:bottom-0 md:left-0 md:h-auto md:justify-between md:border-t-0',
            isOpen
              ? 'visible opacity-100 md:visible md:w-60 md:shrink-0 '
              : ' invisible opacity-0 md:visible md:w-20 md:opacity-100'
          )}
        >
          <ul
            className={classNames(
              'm-0 flex w-full list-none flex-col items-center justify-center p-0 md:justify-start',
              isOpen ? '' : ''
            )}
          >
            <li className=" w-full">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={'/home/dashboard'}
                className={({ isActive }) => {
                  return classNames(
                    'relative flex w-full items-center justify-center gap-2 p-6 hover:bg-slate-50 hover:bg-opacity-25 md:justify-start',
                    isActive
                      ? ' text-primary-blue before:absolute before:left-0 before:h-full before:w-1 before:bg-primary-blue'
                      : ''
                  );
                }}
              >
                <span>
                  <RiDashboardFill size={32}></RiDashboardFill>
                </span>
                <span
                  className={classNames(
                    'whitespace-nowrap text-lg transition-opacity duration-500 ',
                    isOpen
                      ? 'h-auto w-full opacity-100'
                      : 'hidden w-0 opacity-0  md:ml-6'
                  )}
                >
                  {' '}
                  Dashboard{' '}
                </span>
              </NavLink>
            </li>
            <li className=" w-full">
              {' '}
              <NavLink
                onClick={() => setIsOpen(false)}
                to={'/home/budget'}
                className={({ isActive }) => {
                  return classNames(
                    'relative flex w-full items-center  gap-2 p-6 hover:bg-slate-50 hover:bg-opacity-25 ',
                    isActive
                      ? ' text-primary-blue before:absolute before:left-0 before:h-full before:w-1 before:bg-primary-blue'
                      : ''
                  );
                }}
              >
                <span>
                  <CgToday size={32} />
                </span>
                <span
                  className={classNames(
                    'whitespace-nowrap text-lg transition-opacity duration-500',
                    isOpen
                      ? 'h-auto w-full opacity-100'
                      : 'w-0  opacity-0  md:ml-6'
                  )}
                >
                  {' '}
                  This month{' '}
                </span>
              </NavLink>
            </li>
            <li className=" w-full">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={'/home/historic'}
                className={({ isActive }) => {
                  return classNames(
                    'relative flex w-full items-center  gap-2 p-6 hover:bg-slate-50 hover:bg-opacity-25 ',
                    isActive
                      ? 'text-primary-blue before:absolute before:left-0 before:h-full before:w-1 before:bg-primary-blue'
                      : ''
                  );
                }}
              >
                <span>
                  <RiArchiveDrawerFill size={32} />
                </span>
                <span
                  className={classNames(
                    'whitespace-nowrap text-lg transition-opacity duration-500 ',
                    isOpen
                      ? 'h-auto w-full opacity-100'
                      : 'w-0  opacity-0  md:ml-6'
                  )}
                >
                  {' '}
                  Historic{' '}
                </span>
              </NavLink>
            </li>
            <li className=" w-full">
              <NavLink
                onClick={() => setIsOpen(false)}
                to={'/home/categories'}
                className={({ isActive }) => {
                  return classNames(
                    'relative flex w-full items-center gap-2 p-6 hover:bg-slate-50 hover:bg-opacity-25 ',
                    isActive
                      ? 'text-primary-blue before:absolute before:left-0 before:h-full before:w-1 before:bg-primary-blue'
                      : ''
                  );
                }}
              >
                <span>
                  <FaLayerGroup size={32} />
                </span>
                <span
                  className={classNames(
                    'whitespace-nowrap text-lg transition-opacity duration-500 ',
                    isOpen
                      ? 'h-auto w-full opacity-100'
                      : 'w-0  opacity-0  md:ml-6'
                  )}
                >
                  {' '}
                  Categories{' '}
                </span>
              </NavLink>
            </li>
          </ul>
          <div className="mb-14 flex  shrink-0 flex-col items-center justify-center">
            <button className="flex  items-center  gap-2 p-6 text-white-text hover:bg-slate-50/50 ">
              <CgLogOut size={32} />
              <p
                className={classNames(
                  'whitespace-nowrap text-lg  transition-opacity duration-500 ',
                  isOpen
                    ? 'h-auto  opacity-100'
                    : 'hidden w-0 opacity-0 md:ml-6'
                )}
              >
                {' '}
                Logout
              </p>
            </button>
          </div>
        </aside>
        <main className="h-[calc(100%-80px)] w-full">{children}</main>
      </div>
    </>
  );
}

export default NavBar;
