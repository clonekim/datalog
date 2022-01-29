import { Box, Typography } from '@mui/material';

function Greeting({ show }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        mx: 'auto',
        flexGrow: 1,
        borderRadius: 2,
        p: 2,
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.600',
        color: theme =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.50',
        border: '1px solid',
      }}>
      <Typography component='div' variant='body1'>
        게시물이 존재 하지 않습니다.
      </Typography>
    </Box>
  );
}

export default Greeting;
