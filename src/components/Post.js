import { Card, CardContent, Box, CardActions } from '@mui/material';

import 'github-markdown-css';
import TagList from './TagList';

function Post({ post }) {
  const tags = post.tags.map(t => ({ name: t }));

  return (
    <Card variant='outlined'>
      <CardContent>
        <Box
          className='markdown-body'
          sx={{ mb: 1.5, fontSize: 14 }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </CardContent>
      <CardActions>
        <TagList tags={tags} />
      </CardActions>
    </Card>
  );
}

export default Post;
