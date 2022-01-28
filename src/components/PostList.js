import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postReducer';
import Post from './Post';

export default function PostList() {
  const posts = useSelector(state => state.post.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
}
