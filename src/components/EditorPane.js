import { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, TextField, Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from './TabPane';
import TagChipInputText from './TagChipInputText';

import markdown from 'markdown-it';
import { useDispatch } from 'react-redux';
import { EDITOR_TOGGLE } from '../store/option';
import { addPost } from '../store/post';

import 'github-markdown-css';

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

  const saveToServer = () => {
    const payload = {
      sub: text.split(/\n/)[0],
      body: text,
      tags: tags,
    };

    dispatch(addPost(payload));
    closeEditor();
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
            minRows={8}
            maxRows={30}
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <TagChipInputText tags={tags} setTags={setTags} />
      </TabPanel>

      <TabPanel value={index} index={1} style={{ padding: 4 }}>
        <Box className='markdown-body' dangerouslySetInnerHTML={markup()} />
      </TabPanel>

      {index == 0 && <Button onClick={saveToServer}>Save</Button>}
    </>
  );
}

export default EditorPane;
