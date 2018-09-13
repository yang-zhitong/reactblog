export const getDate = (date, { time, day } = {}) => {
  if (day) return new Date(date).toDateString().slice(0, -5);
  return new Date(date).toString();
};