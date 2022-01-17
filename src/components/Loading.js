import { Box, CircularProgress } from '@mui/material';

function Loading({ show }) {
  if (show) {
    return (
      <Box sx={{ display: 'flex', mx: 'auto' }}>
        <CircularProgress />
      </Box>
    );
  }
  return null;
}

export default Loading;
