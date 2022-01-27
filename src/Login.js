import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlined from '@mui/icons-material/FacebookOutlined';
import { googleLogin } from './api/user';

export default function Login() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box sx={{ mt: 3, width: '60%' }}>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            endIcon={<GoogleIcon />}
            onClick={googleLogin}>
            Google
          </Button>
        </Box>
        <Box sx={{ mt: 1, width: '60%' }}>
          <Button
            variant="outlined"
            size="large"
            fullWidth
            endIcon={<FacebookOutlined />}>
            Facebook
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
