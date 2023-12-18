const formatWithLeadingZero = (num: number) => (num < 10 ? `0${num}` : num.toString());

export const formatDateTime = (dateTime: Date) => {
  const hours = formatWithLeadingZero(dateTime.getHours());
  const minutes = formatWithLeadingZero(dateTime.getMinutes());
  const date = `${formatWithLeadingZero(dateTime.getDate())}.${formatWithLeadingZero(dateTime.getMonth() + 1)}.${dateTime.getFullYear()}`;

  return {
    time: `${hours}:${minutes}`,
    date,
  };
};
