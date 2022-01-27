import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/postReducer';
import Post from './Post';

export default function PostList() {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
  }, []);

  return (
    <>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
}
