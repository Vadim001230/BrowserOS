const months = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

function getNumberOfMonth(month) {
  const monthIndex = months.indexOf(month.slice(0, 3).toLowerCase());
  return monthIndex === -1 ? monthIndex : monthIndex + 1;
}
