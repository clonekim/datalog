import { AppBar, Box, Button, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import { useSelector } from 'react-redux';

import AvatarMenu from './AvatarMenu';

function Navigation() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const user = useSelector(state => state.user);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              size="large"
              startIcon={<ConnectedTvIcon />}>
              Connected
            </Button>
          </Box>
          <AvatarMenu initials={user.initials} />
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navigation;
