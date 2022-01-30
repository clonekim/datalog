import { useState, useEffect, useCallback, useMemo } from 'react';
import { Tabs, Tab, TextField, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TabPanel from './TabPane';
import TagChipInputText from './TagChipInputText';
import FileList from './editor/FileList';

import { useDispatch, useSelector } from 'react-redux';
import { addPost, selectSource, updatePost } from '../store/postReducer';
import { editorToggle } from '../store/optionReducer';
import { generateURL, fetchById } from '../api/post';
import md from '../api/markdown';
import 'github-markdown-css';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';
import { DndProvider, useDrop } from 'react-dnd';

const TargetBox = props => {
  const { onDrop, children } = props;
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item) {
        console.log(item.files);
        onDrop(item.files);
      },
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [props],
  );

  return <Box ref={drop}>{children}</Box>;
};

function EditorPane({ width }) {
  const feedId = useSelector(state => state.post.id);
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [hasError, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState();
  const [preview, setPreview] = useState();
  const [tags, setTags] = useState([]);

  const [droppedFiles, setDroppedFiles] = useState([]);

  const fileCount = useMemo(() => droppedFiles.length, [droppedFiles]);

  useEffect(() => {
    if (feedId) {
      fetchById(feedId).then(data => {
        console.log(data);
        setTags(data.tags);
        setText(data.body);
        setError(false);
        setEdit(true);
        setDroppedFiles(data.attachments);
      });
    }
  }, [feedId]);

  const closeEditor = () => {
    dispatch(selectSource(null));
    dispatch(editorToggle(false));
  };

  const markup = () => {
    if (preview && preview.length > 0) {
      return { __html: preview };
    }

    return null;
  };

  const saveToServer = () => {
    if (!text || text.trim().length === 0) {
      setError(true);
      return;
    }

    const payload = {
      sub: text.split(/\n/)[0],
      body: text,
      tags: tags,
      attachments: droppedFiles,
    };

    if (isEdit) dispatch(updatePost(Object.assign(payload, { id: feedId })));
    else dispatch(addPost(payload));
    closeEditor();
  };

  const handleFileDrop = useCallback(
    item => {
      if (item) {
        setDroppedFiles(state => [...state, ...item]);
      }
    },
    [setDroppedFiles],
  );

  const handleURL = async file => {
    const url = await generateURL(`${feedId}/${file.path}`);
    setText(text + '\n' + url);
  };

  useEffect(() => {
    if (index === 1) {
      if (text && text.trim().length > 0) setPreview(md.render(text));
    }
  }, [index]);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <TargetBox onDrop={handleFileDrop}>
          <Box sx={{ display: 'flex', width: width }}>
            <Tabs
              value={index}
              onChange={(_, value) => setIndex(value)}
              sx={{ flexGrow: 1 }}>
              <Tab label='마크다운' />
              <Tab label='미리보기' />
              <Tab label={`첨부(${fileCount})`} />
            </Tabs>

            <IconButton size='small' onClick={closeEditor}>
              <CloseIcon fontSize='inherit' />
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

          <TabPanel value={index} index={1} style={{ minHeight: 300 }}>
            <Box className='markdown-body' dangerouslySetInnerHTML={markup()} />
          </TabPanel>

          <TabPanel
            value={index}
            index={2}
            style={{ minHeight: 300, maxHeight: 328 }}>
            <FileList
              handleURL={handleURL}
              droppedFiles={droppedFiles}
              setDroppedFiles={setDroppedFiles}
            />
          </TabPanel>

          {index === 0 && (
            <Button fullWidth variant='contained' onClick={saveToServer}>
              {isEdit ? '업데이트' : '저장'}
            </Button>
          )}
        </TargetBox>
      </DndProvider>
    </>
  );
}

export default EditorPane;
