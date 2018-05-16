import React from 'react';
import classes from "./Layout.css";
import Aux from '../../hoc/Aux';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
  <Aux>
    <ToolBar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>

);

export default Layout;
