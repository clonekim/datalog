import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Container,
  Dialog,
  Fab,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import Navigation from './components/Navigation';
import PostList from './components/PostList';
import Editor from './components/Editor';
import SidePanel from './components/SidePanel';
import NotFound from './components/NotFound';
import { editorToggle } from './store/optionReducer';

const ShowEditor = ({ mobile }) => {
  if (mobile) {
    return (
      <Dialog fullScreen={true} open={true}>
        <Box sx={{ px: 0.4 }}>
          <Editor width='auto' />
        </Box>
      </Dialog>
    );
  }

  return (
    <Card sx={{ position: 'fixed', bottom: 3, right: 2 }}>
      <CardContent>
        <Editor width={550} />
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const showEditor = useSelector(state => state.option.showEditor);
  const posts = useSelector(state => state.post.list);

  const toggleEditor = () => {
    dispatch(editorToggle(true));
  };

  return (
    <>
      <Navigation />
      <Container sx={{ mt: 3 }} maxWidth='lg'>
        <NotFound show={posts.length === 0} />

        <Grid container spacing={1}>
          <Grid item md={8} sm={12} xs={12}>
            <PostList />
          </Grid>

          {!mobile && (
            <Grid item md={4} sm={12} xs={12}>
              <SidePanel />
            </Grid>
          )}
        </Grid>

        {!showEditor && (
          <Fab
            color='primary'
            sx={{ position: 'fixed', bottom: 8, right: 10 }}
            onClick={toggleEditor}>
            <EditIcon />
          </Fab>
        )}

        {showEditor && <ShowEditor mobile={mobile} />}
      </Container>
      <Box sx={{ p: 3 }}></Box>
    </>
  );
}
