import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../store/postReducer';
import { fetchTags } from '../store/tagReducer';
import Post from './Post';

import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

hljs.configure({
  ignoreUnescapedHTML: true,
});

export default function PostList() {
  const posts = useSelector(state => state.post.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(fetchTags());
    console.log('highlight...');
    hljs.highlightAll();
  }, [posts]);

  return (
    <>
      {posts.map(post => (
        <Post {...post} key={post.id} />
      ))}
    </>
  );
}
