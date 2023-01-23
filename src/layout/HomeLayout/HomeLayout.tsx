import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../Components/NavBar';

function HomeLayout() {
  return (
    <NavBar>
      <Outlet></Outlet>
    </NavBar>
  );
}

export default HomeLayout;
