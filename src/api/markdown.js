import markdown from 'markdown-it';

const opts = {
  html: true,
};

const md = markdown(opts);

export default md;
