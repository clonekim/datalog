import FilePresentIcon from '@mui/icons-material/FilePresent';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import Filter4Icon from '@mui/icons-material/Filter4';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CodeIcon from '@mui/icons-material/Code';
import PhotoIcon from '@mui/icons-material/Photo';

import { Box, IconButton, Divider } from '@mui/material';

function Toolbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: 'fit-content',
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
          m: 1.0,
        },
      }}>
      <IconButton size='small'>
        <Filter1Icon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <Filter2Icon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <Filter3Icon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <Filter4Icon fontSize='inherit' />
      </IconButton>

      <Divider orientation='vertical' flexItem variant='middle' />

      <IconButton size='small'>
        <FormatListBulletedIcon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <FormatListNumberedIcon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <CodeIcon fontSize='inherit' />
      </IconButton>

      <Divider orientation='vertical' flexItem variant='middle' />

      <IconButton size='small'>
        <FilePresentIcon fontSize='inherit' />
      </IconButton>

      <IconButton size='small'>
        <PhotoIcon fontSize='inherit' />
      </IconButton>
    </Box>
  );
}

export default Toolbar;
