import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';

function FileElement({ file, setDroppedFiles, handleURL }) {
  const deleteFile = () => {
    setDroppedFiles(state => state.filter(f => f.name !== file.name));
  };

  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton edge='end' onClick={deleteFile}>
          <DeleteIcon />
        </IconButton>
      }>
      <ListItemIcon>
        <IconButton onClick={() => handleURL(file)}>
          <AttachFileIcon />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary={file.name} secondary={file.size} />
    </ListItem>
  );
}

function FileList({ droppedFiles, setDroppedFiles, handleURL }) {
  return (
    <List>
      {droppedFiles.map(file => (
        <FileElement
          handleURL={handleURL}
          setDroppedFiles={setDroppedFiles}
          file={file}
          key={file.name}
        />
      ))}
    </List>
  );
}

export default FileList;
