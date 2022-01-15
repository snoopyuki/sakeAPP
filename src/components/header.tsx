import React, { ReactNode } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';
// import {DrawerMenu} from './drawerMenu';

type PropsType = {
  children: ReactNode;
  setDrawerOpen: (pram: boolean) => void;
};

export const Header = (props: PropsType) => {
  const { children, setDrawerOpen } = props;
  const onClickDrawerMenu = () => {
    setDrawerOpen(true);
  };
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => onClickDrawerMenu()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
