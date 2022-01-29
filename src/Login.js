import {
  Avatar,
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import { googleLogin } from './api/user';
import { useEffect, useState } from 'react';

export default function Login() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 680);

    return function cleanup() {
      if (t) clearTimeout(t);
    };
  }, []);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {show && <LinearProgress color="primary" sx={{ width: '100%' }} />}

        {!show && (
          <>
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
                startIcon={<GoogleIcon />}
                onClick={googleLogin}>
                Google
              </Button>
            </Box>
            <Box sx={{ mt: 1, width: '60%' }}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<FacebookIcon />}>
                Facebook
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
}
