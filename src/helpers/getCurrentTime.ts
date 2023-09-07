export const getCurrentTime = (timeNumber: number) => {
  const date = new Date(timeNumber);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(2);
  const time = date.toLocaleTimeString(
    'en-US',
  { hour: 'numeric', minute: 'numeric' }
  );

  return `${month}/${day}/${year}, ${time}`;
}
