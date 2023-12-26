const formatWithLeadingZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

export const formatTime = (time: Date) => {
  const hours = formatWithLeadingZero(time.getHours());
  const minutes = formatWithLeadingZero(time.getMinutes());

  return `${hours}:${minutes}`;
};


export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};
