import _date from 'date-and-time';

export const toFormat = date => {
  return _date.format(new Date(date), 'ddd, MMM DD YYYY');
};
