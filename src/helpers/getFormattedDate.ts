export const getFormattedDate = (date: string) => {
  const newDate = new Date(Date.parse(date));
  const dateString = newDate.toString();

  return `${dateString.slice(4, 10)},${dateString.slice(10, 15)}`;
}
