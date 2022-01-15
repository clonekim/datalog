import React, { useEffect } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN } from '../store/user';
import { googleLogin } from '../api/user';

function Navigation() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const login = () => {
    googleLogin()
      .then(res => {
        dispatch({ type: USER_LOGIN, payload: res });
      })
      .catch(err => {});
  };

  const showProfile = () => {};

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            DataLog
          </Typography>
          {user.isLogin && (
            <Button color='inherit' onClick={showProfile}>
              {user.username}
            </Button>
          )}
          {!user.isLogin && (
            <Button color='inherit' onClick={login}>
              Login
            </Button>
          )}
          {matches && (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
