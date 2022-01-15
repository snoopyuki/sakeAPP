import React, { ReactNode } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@material-ui/icons/Menu';

type PropsType = {
  children: ReactNode;
};

export const Header = (props: PropsType) => {
  const { children } = props;
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
