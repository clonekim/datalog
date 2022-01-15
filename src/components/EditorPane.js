import { useState, useEffect } from 'react';
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  Box,
  Button,
  InputAdornment,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from './TabPane';
import markdown from 'markdown-it';
import 'github-markdown-css';
import { useDispatch } from 'react-redux';
import { EDITOR_TOGGLE } from '../store/option';

const opts = {
  html: true,
};

const md = markdown(opts);

function EditorPane() {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState();
  const [preview, setPreview] = useState();
  const [tags, setTags] = useState([]);

  const closeEditor = () => {
    dispatch({ type: EDITOR_TOGGLE, payload: false });
    setTags([]);
    setText(null);
    setPreview(null);
  };

  const markup = () => {
    return { __html: preview };
  };

  const deleteTag = text => {
    setTags(state => state.filter(i => i !== text));
  };

  const onKeyDown = e => {
    if (e.keyCode == 13) {
      if (e.target.value.trim() != '') {
        const value = e.target.value;
        setTags(state => [...state, value]);
        e.target.value = '';
      }
    } else if (e.keyCode == 8 && tags.length > 0) {
      setTags(state => state.filter(i => i !== state.pop()));
    }
  };

  useEffect(() => {
    if (index === 1) {
      if (text && text.trim().length > 0) setPreview(md.render(text));
    }
  }, [index]);

  return (
    <>
      <Grid container justifyContent='space-between'>
        <Tabs value={index} onChange={(_, value) => setIndex(value)}>
          <Tab label='Source' />
          <Tab label='Preview' />
        </Tabs>

        <Button size='small' onClick={closeEditor}>
          <CloseIcon />
        </Button>
      </Grid>

      <TabPanel value={index} index={0} style={{ padding: 4 }}>
        <Box style={{ paddingBottom: 5 }}>
          <TextField
            fullWidth
            multiline
            value={text}
            sx={{ rows: 20 }}
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <TextField
          fullWidth
          onKeyDown={onKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {tags.map(tag => (
                  <Chip
                    key={tag}
                    label={`${tag}`}
                    size='small'
                    onDelete={() => deleteTag(tag)}
                  />
                ))}
              </InputAdornment>
            ),
          }}
        />
      </TabPanel>

      <TabPanel value={index} index={1} style={{ padding: 4 }}>
        <Box className='markdown-body' dangerouslySetInnerHTML={markup()}></Box>
      </TabPanel>
    </>
  );
}

export default EditorPane;
