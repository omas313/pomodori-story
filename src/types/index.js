import { shape, string, number } from 'prop-types';

export const taskType = shape({
  _id: string.isRequired,
  name: string.isRequired,
  pomodori: number.isRequired
});
