import { StaticDatePicker } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Box, Chip, TextField, Card } from '@mui/material';
import { useState, useEffect } from 'react';
import { TAG_FETCHED } from '../store/tag';

import TabPane from './TabPane';

function SidePane() {
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch({ type: TAG_FETCHED });
  });

  return (
    <Card variant='outlined'>
      <Tabs value={index} onChange={(_, value) => setIndex(value)}>
        <Tab label='태그' />
        <Tab label='달력' />
      </Tabs>

      <TabPane value={index} index={0} sx={{ p: 0 }} style={{ minHeight: 100 }}>
        {tags.map(tag => (
          <Chip
            size='small'
            label={`${tag.name}(${tag.count})`}
            style={{ margin: '2px 3px' }}
            key={tag.name}
          />
        ))}
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
