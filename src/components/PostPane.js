import { Stack, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Post from './Post';
import Loading from './Loading';
import { fetchPost } from '../store/post';

function PostPane() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    dispatch(fetchPost());
    setTimeout(() => setShow(false), 600);
  }, []);

  return (
    <Stack spacing={2}>
      <Loading show={show} />

      {!show && posts.map(post => <Post post={post} key={post.id} />)}
      {!show && posts.length == 0 && <Alert>No Content</Alert>}
    </Stack>
  );
}

export default PostPane;
