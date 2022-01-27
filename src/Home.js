import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, Container, Fab, Grid } from '@mui/material';
import Navigation from './components/Navigation';
import PostList from './components/PostList';
import TagList from './components/TagList';
import Editor from './components/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { EDITOR_TOGGLE } from './store/actionType';

export default function Home() {
  const tags = [{ count: 1232, name: 'react' }];
  const dispatch = useDispatch();
  const showEditor = useSelector(state => state.option.showEditor);
  const toggleEditor = () => {
    dispatch({ type: EDITOR_TOGGLE, payload: true });
  };
  return (
    <>
      <Navigation />
      <Container sx={{ mt: 3 }} maxWidth="md">
        <Grid container spacing={1}>
          <Grid item md={8} sm={12} xs={12}>
            <PostList />
          </Grid>

          <Grid item md={4} sm={12} xs={12}>
            <TagList tags={tags} />
          </Grid>
        </Grid>

        {!showEditor && (
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 13, right: 12 }}
            onClick={toggleEditor}>
            <EditIcon />
          </Fab>
        )}

        <Card sx={{ position: 'fixed', bottom: 13, right: 12 }}>
          <CardContent>
            <Editor />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
