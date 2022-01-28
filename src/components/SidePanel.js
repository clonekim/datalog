import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import TagList from './TagList';

function SidePanel() {
  const tags = useSelector(state => state.tags);
  return (
    <Paper variant='outlined' sx={{ minHeight: 300, p: 1, mt: 2 }}>
      <TagList tags={tags} />
    </Paper>
  );
}

export default SidePanel;
