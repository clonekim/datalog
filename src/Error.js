import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Error() {
  const error = useSelector(state => state.error);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error.hasError) setShow(true);

    return () => setShow(false);
  }, [error]);

  return (
    <>
      {show && (
        <Typography
          component='div'
          variant='body1'
          style={{
            width: '100%',
            position: 'relative',
          }}>
          <Box
            sx={{
              bgcolor: theme =>
                theme.palette.mode === 'dark' ? '#101010' : 'grey.600',
              color: theme =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.50',
              border: '1px solid',
              borderColor: theme =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
              p: 2,
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: '700',
              position: 'absolute',
              top: 40,
              zIndex: 2000,
            }}>
            <h3>Error</h3>
            <pre>{error.message}</pre>
            {error.stack && <pre>{error.stack}</pre>}
          </Box>
        </Typography>
      )}
    </>
  );
}

export default Error;
