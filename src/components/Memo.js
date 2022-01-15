import { Card, CardContent, Typography } from '@mui/material';

function Memo({ memo }) {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h4'> {memo.sub} </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 14 }}>{memo.body}</Typography>
      </CardContent>
    </Card>
  );
}

export default Memo;
