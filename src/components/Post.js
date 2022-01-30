import { Card, CardContent, Box, CardActions } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost, selectSource } from '../store/postReducer';
import { editorToggle } from '../store/optionReducer';
import TagList from './TagList';
import PostMenu from './PostMenu';

function Post({ id, isDraft, tags, updatedAt, body, author }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    dispatch(selectSource(id));
    dispatch(editorToggle(true));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deletePost(id));
    handleClose();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Card variant='outlined'>
        <CardContent>
          <PostMenu
            author={author}
            time={updatedAt}
            isDraft={isDraft}
            anchorEl={anchorEl}
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <Box
            sx={{ mb: 1.5, fontSize: 14 }}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </CardContent>
        <CardActions>
          <TagList tags={tags.map(t => ({ name: t }))} />
        </CardActions>
      </Card>
    </Box>
  );
}

export default Post;
