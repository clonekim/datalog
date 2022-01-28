import {
  Card,
  CardContent,
  Box,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'github-markdown-css';

import TagList from './TagList';
import { EDITOR_TOGGLE, SOURCE_SELECTED } from '../store/actionType';
import { deletePost } from '../store/postReducer';
import { toFormat } from '../date-util';

const CardHeader = ({
  author,
  time,
  isDraft,
  anchorEl,
  open,
  handleClick,
  handleClose,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant='caption' color='text.secondary' sx={{ flexGrow: 1 }}>
        {author}가 작성하였음 {toFormat(time)}
      </Typography>

      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem dense onClick={handleEdit}>
          편집
        </MenuItem>
        <MenuItem dense onClick={handleDelete}>
          삭제
        </MenuItem>
        <MenuItem dense>{isDraft ? '출판하기' : '임시상태로'}</MenuItem>
      </Menu>
    </Box>
  );
};

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
    dispatch({ type: SOURCE_SELECTED, payload: id });
    dispatch({ type: EDITOR_TOGGLE, payload: true });
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
          <CardHeader
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
            className='markdown-body'
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
