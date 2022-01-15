import { Stack, Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Memo from './Memo';
import { fetchMemo } from '../store/memo';

function MemoPane() {
  const dispatch = useDispatch();
  const memos = useSelector(state => state.memos);

  useEffect(() => {
    dispatch(fetchMemo());
  }, []);

  if (memos.length == 0) {
    return <Box>작성한 메모가 존재하지 않습니다</Box>;
  }
  return (
    <Stack spacing={2}>
      {memos.map(memo => (
        <Memo memo={memo} key={memo.id} />
      ))}
    </Stack>
  );
}

export default MemoPane;
