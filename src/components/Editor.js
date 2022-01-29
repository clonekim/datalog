import { useState, useEffect } from 'react';
import { Tabs, Tab, TextField, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from './TabPane';
import TagChipInputText from './TagChipInputText';

import { useDispatch, useSelector } from 'react-redux';
import { addPost, selectSource, updatePost } from '../store/postReducer';
import { editorToggle } from '../store/optionReducer';
import { fetchById } from '../api/post';
import md from '../api/markdown';
import 'github-markdown-css';

function EditorPane({ width }) {
  const feedId = useSelector(state => state.post.id);
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [hasError, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState();
  const [preview, setPreview] = useState();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (feedId) {
      fetchById(feedId).then(data => {
        setTags(data.tags);
        setText(data.body);
        setError(false);
        setEdit(true);
      });
    }
  }, [feedId]);

  const closeEditor = () => {
    dispatch(selectSource(null));
    dispatch(editorToggle(false));
    setTags([]);
    setText('');
    setPreview(null);
    setError(false);
    setEdit(false);
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

    if (isEdit) dispatch(updatePost(Object.assign(payload, { id: feedId })));
    else dispatch(addPost(payload));
    closeEditor();
  };

  useEffect(() => {
    if (index === 1) {
      if (text && text.trim().length > 0) setPreview(md.render(text));
    }
  }, [index]);

  return (
    <>
      <Box sx={{ display: 'flex', width: width }}>
        <Tabs
          value={index}
          onChange={(_, value) => setIndex(value)}
          sx={{ flexGrow: 1 }}>
          <Tab label='마크다운' />
          <Tab label='미리보기' />
        </Tabs>

        <IconButton size='small' onClick={closeEditor}>
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
        <Box className='markdown-body' dangerouslySetInnerHTML={markup()} />
      </TabPanel>

      {index == 0 && (
        <Button fullWidth variant='contained' onClick={saveToServer}>
          {isEdit ? '업데이트' : '저장'}
        </Button>
      )}
    </>
  );
}

export default EditorPane;
