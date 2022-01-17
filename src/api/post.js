import functions from './firebase.function';
import { httpsCallable } from 'firebase/functions';

const addPost = httpsCallable(functions, 'handler/addPost');
const fetchPosts = httpsCallable(functions, 'handler/fetchPosts');

export const fetch = async () => {
  try {
    const { data = [] } = await fetchPosts();

    return data;
  } catch (err) {
    console.log('Error =>', err);
    return [];
  }
};

export const create = async payload => {
  try {
    const result = await addPost(payload);

    console.log('>> ', result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
