import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';
import { fetchTags } from '../store/tagReducer';
import TagList from './TagList';

function SidePanel() {
  const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTags());
  }, []);
  return (
    <Card variant='outlined'>
      <TagList tags={tags} />
    </Card>
  );
}

export default SidePanel;
