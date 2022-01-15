import { Grid } from '@mui/material';

import MemoPane from '../components/MemoPane';
import SidePane from '../components/SidePane';

function Home() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <MemoPane />
      </Grid>

      <Grid item xs={12} md={4}>
        <SidePane />
      </Grid>
    </Grid>
  );
}

export default Home;
