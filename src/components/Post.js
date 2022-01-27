import { Card, CardContent, Box, CardActions, Typography } from '@mui/material';

import 'github-markdown-css';
//import TagList from './TagList';

function Post({ post }) {
  const tags = post.tags.map(t => ({ name: t }));

  return (
    <Box sx={{ mt: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="caption" color="text.secondary">
            Your가 작성하였음
          </Typography>
          <Box
            className="markdown-body"
            sx={{ mb: 1.5, fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
}

export default Post;
