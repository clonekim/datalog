import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogined } from './store/userReducer';
import Home from './Home';
import Login from './Login';

export default function Layout() {
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    userLogined(dispatch);
  }, []);

  if (isLogin) return <Home />;

  return <Login />;
}
