import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toFormat } from '../date-util';

const PostMenu = ({
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

export default PostMenu;
