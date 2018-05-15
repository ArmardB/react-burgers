import React from 'react';
import Aux from '../../hoc/Aux';
import ToolBar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.css';

const Layout = (props) => (
  <Aux>
    <ToolBar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>

);

export default Layout;
