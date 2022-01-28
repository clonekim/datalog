import { Chip, Paper } from '@mui/material';

function TagList({ tags = [] }) {
  if (tags.length === 0) return null;

  const _tags = tags.map(v =>
    v.count ? { name: v, cout: v.count } : { name: v },
  );

  return (
    <>
      {_tags.map(tag => (
        <Chip
          size='small'
          label={tag.count ? `${tag.name}(${tag.count})` : tag.name}
          style={{ margin: '2px 3px' }}
          key={tag.name}
        />
      ))}
    </>
  );
}

export default TagList;
