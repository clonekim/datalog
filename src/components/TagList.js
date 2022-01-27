import { Chip, Paper } from '@mui/material';

function TagList({ tags = [] }) {
  console.log(tags);

  return (
    <>
      <Paper sx={{ p: 2, height: 300 }}>
        {tags.map(tag => (
          <Chip
            size="small"
            label={tag.count ? `${tag.name}(${tag.count})` : tag.name}
            style={{ margin: '2px 3px' }}
            key={tag.name}
          />
        ))}
      </Paper>
    </>
  );
}

export default TagList;
