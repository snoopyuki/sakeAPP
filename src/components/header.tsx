// @ts-nocheck

import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import DrawerMenu from "./drawerMenu";

export const Header = (props) => {
  const onClickDrawerMenu = () => {
    props.setDrawerOpen(true);
  };
  return (
    <>
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
            {props.children}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
