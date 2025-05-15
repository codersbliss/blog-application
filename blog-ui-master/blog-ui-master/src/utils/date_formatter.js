import { formatDistanceToNow } from 'date-fns';

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export default formatRelativeTime;
