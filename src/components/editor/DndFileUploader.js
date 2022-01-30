import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';

const TargetBox = props => {
  const { onDrop } = props;
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

  return (
    <Box
      ref={drop}
      sx={{
        border: '1px solid',
        width: '100%',
        height: 200,
      }}>
      <TextField fullWidth multiline minRows={8} focused={false} />
    </Box>
  );
};

function FileElement({ name, size }) {
  console.log(name, size);

  return (
    <ListItem>
      <ListItemIcon>{name}</ListItemIcon>
      <ListItemText primary={name} secondary={size} />
    </ListItem>
  );
}

function FileList({ files }) {
  console.log(files);

  return (
    <List>
      {files.map(f => (
        <FileElement name={f.name} size={f.size} key={f.name} />
      ))}
    </List>
  );
}

function DndFileUploader({ droppedFiles, setDroppedFiles }) {
  const handleFileDrop = useCallback(
    item => {
      if (item) {
        setDroppedFiles(state => [...state, ...item]);
      }
    },
    [setDroppedFiles],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TargetBox onDrop={handleFileDrop} />
      <FileList files={droppedFiles} />
    </DndProvider>
  );
}

export default DndFileUploader;
