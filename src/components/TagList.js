import { Chip } from '@mui/material';

function TagList({ tags = [] }) {
  if (tags.length === 0) return null;

  return (
    <>
      {tags.map(tag => (
        <Chip
          label={tag.count ? `${tag.name}(${tag.count})` : tag.name}
          style={{ margin: '2px 3px' }}
          key={tag.name}
        />
      ))}
    </>
  );
}

export default TagList;
