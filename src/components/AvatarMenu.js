import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userLogout } from '../store/userReducer';
import { themeToggle } from '../store/optionReducer';

export default function AvatarMenu({ username, initials }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isDark = useSelector(state => state.option.theme === 'dark');
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    dispatch(themeToggle(isDark ? 'light' : 'dark'));
    handleClose();
  };

  const logout = () => {
    userLogout(dispatch);
  };

  return (
    <>
      <IconButton
        edge='start'
        color='inherit'
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Avatar>{initials}</Avatar>
      </IconButton>

      <Menu
        sx={{ width: 200 }}
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem component='span'>
          <ListItemText>Welcome {username} </ListItemText>
        </MenuItem>

        <MenuItem onClick={toggleTheme}>
          <ListItemIcon>
            {isDark && <LightModeIcon />}
            {!isDark && <DarkModeIcon />}
          </ListItemIcon>
          <ListItemText secondary={isDark ? 'Light' : 'Dark'}></ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText secondary='My Profile' />
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText secondary='Logout' />
        </MenuItem>
      </Menu>
    </>
  );
}
