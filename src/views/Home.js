import { Grid } from '@mui/material';

import PostPane from '../components/PostPane';
import SidePane from '../components/SidePane';
import EditorPane from '../components/EditorPane';
import { useSelector } from 'react-redux';

function Home() {
  const showEditor = useSelector(state => state.option.showEditor);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        {!showEditor && <PostPane />}
        {showEditor && <EditorPane />}
      </Grid>

      <Grid item xs={12} md={4}>
        <SidePane />
      </Grid>
    </Grid>
  );
}

export default Home;
