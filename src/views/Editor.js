import {
  Grid,
  Box,
  TextField,
  Button,
  Container,
  InputAdornment,
  Chip,
  Stack,
  Divider,
  Paper,
} from '@mui/material';

import markdown from 'markdown-it';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMemo } from '../store/memo';
import 'github-markdown-css';

const opts = {
  html: true,
};
const md = markdown(opts);

function Editor() {
  const [text, setText] = useState();
  const [inputTag, setInputTag] = useState();
  const [preview, setPreview] = useState();
  const [tags, setTag] = useState([]);
  const dispatch = useDispatch();

  const onChange = e => {
    setText(e.target.value);
    setPreview(md.render(e.target.value));
  };

  const markup = () => {
    return { __html: preview };
  };

  const onSave = () => {
    dispatch(addMemo(text));
  };

  const onChange2 = e => {
    setInputTag(e.target.value);
  };

  const deleteTag = text => {
    //    if (tags.length == 1) setTag([]);
    setTag(state => state.filter(i => i !== text));
  };

  const onKeyDown = e => {
    if (e.keyCode == 13) {
      if (e.target.value.trim() != '') {
        setTag(state => [...state, e.target.value]);
      }
    }
  };

  return (
    <>
      <Grid container direction='row' sx={{ pt: 2, m: 0.3 }} spacing={1}>
        <Grid item md={6} xs={12} sm={12}>
          <TextField
            label='source'
            fullWidth
            multiline
            value={text}
            onChange={onChange}
          />
        </Grid>

        <Grid item md={6} xs={12} sm={12}>
          <Paper
            variant='outlined'
            className='markdown-body'
            dangerouslySetInnerHTML={markup()}></Paper>
        </Grid>

        <Grid item md={12} xs={12} sm={12}>
          <TextField label='tag' />
        </Grid>
      </Grid>
    </>
  );
}

export default Editor;
