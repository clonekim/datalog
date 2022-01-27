import { useState, useEffect } from 'react';
import { Grid, Tabs, Tab, TextField, Box, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from './TabPane';
import TagChipInputText from './TagChipInputText';

import markdown from 'markdown-it';
import { useDispatch } from 'react-redux';
import { EDITOR_TOGGLE } from '../store/actionType';
import { addPost } from '../store/postReducer';

import 'github-markdown-css';

const opts = {
  html: true,
};

const md = markdown(opts);

function EditorPane() {
  const dispatch = useDispatch();
  const [hasError, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState();
  const [preview, setPreview] = useState();
  const [tags, setTags] = useState([]);

  const closeEditor = () => {
    dispatch({ type: EDITOR_TOGGLE, payload: false });
    setTags([]);
    setText(null);
    setPreview(null);
    setError(false);
  };

  const markup = () => {
    if (preview && preview.length > 0) {
      return { __html: preview };

    }

    return null;

  };

  const saveToServer = () => {
    if (!text || text.trim().length == 0) {

      setError(true);
      return;
    }

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
      <Box sx={{ display: 'flex', width: 550 }}>
        <Tabs value={index} onChange={(_, value) => setIndex(value)} sx={{ flexGrow: 1 }}>
          <Tab label="Source" />
          <Tab label="Preview" />
        </Tabs>

        <IconButton size="small" onClick={closeEditor}>
          <CloseIcon />
        </IconButton>
      </Box>

      <TabPanel value={index} index={0} style={{ padding: 4 }}>
        <Box style={{ paddingBottom: 5 }}>
          <TextField
            error={hasError}
            fullWidth
            multiline
            value={text}
            minRows={8}
            maxRows={30}
            focused={false}
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <TagChipInputText tags={tags} setTags={setTags} />
      </TabPanel>

      <TabPanel value={index} index={1} style={{ padding: 4, minHeight: 300 }}>
        <Box className="markdown-body" dangerouslySetInnerHTML={markup()} />
      </TabPanel>

      {index == 0 && (
        <Button fullWidth variant="contained" onClick={saveToServer}>
          Save
        </Button>
      )}
    </>
  );
}

export default EditorPane;
