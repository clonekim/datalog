import { TextField, InputAdornment, Chip } from '@mui/material';

function TagChipInputText({ tags, setTags }) {
  const deleteTag = text => {
    setTags(state => state.filter(i => i !== text));
  };

  const onKeyDown = e => {
    const text = e.target.value;

    if (e.keyCode === 13) {
      if (text !== '' && !tags.includes(text)) {
        setTags(state => [...state, text]);
        e.target.value = '';
      }
    } else if (e.keyCode === 8) {
      if (!text && tags.length > 0) {
        const last = tags.pop();
        setTags(state => state.filter(i => i !== last));
      }
    }
  };

  return (
    <TextField
      fullWidth
      onKeyDown={onKeyDown}
      focused={false}
      placeholder="입력후 Enter를 치세요"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {tags.map(tag => (
              <Chip
                key={tag}
                label={`${tag}`}
                size="small"
                onDelete={() => deleteTag(tag)}
              />
            ))}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default TagChipInputText;
