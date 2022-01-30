import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import TagList from './TagList';

function SidePanel() {
  const tags = useSelector(state => state.tags);
  if (!tags || tags.length == 0) return null;

  return (
    <Paper variant='outlined' sx={{ minHeight: 300, p: 1, mt: 2 }}>
      <TagList tags={tags} />
    </Paper>
  );
}

export default SidePanel;
