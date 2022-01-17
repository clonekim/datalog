import { StaticDatePicker } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, TextField, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchTags } from '../store/tag';

import TabPane from './TabPane';
import TagList from './TagList';
import Loading from './Loading';

function SidePane() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags);
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    dispatch(fetchTags());
    setTimeout(() => setShow(false), 600);
  }, [index]);

  return (
    <Card variant='outlined'>
      <Tabs value={index} onChange={(_, value) => setIndex(value)}>
        <Tab label='태그' />
        <Tab label='달력' />
      </Tabs>

      <TabPane value={index} index={0} sx={{ p: 0 }} style={{ minHeight: 100 }}>
        <Loading show={show} />
        {!show && <TagList tags={tags} />}
      </TabPane>

      <TabPane value={index} index={1}>
        <StaticDatePicker
          displayStaticWrapperAs='desktop'
          onChange={e => console.log(e)}
          renderInput={params => <TextField {...params} />}
        />
      </TabPane>
    </Card>
  );
}

export default SidePane;
