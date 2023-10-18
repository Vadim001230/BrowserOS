const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function transformDay(day) {
  return day[0].toUpperCase() + day.slice(1, 3).toLowerCase();
}

function getNumberOfDay(day) {
  const dayIndex = days.indexOf(transformDay(day));
  return dayIndex === -1 ? dayIndex : dayIndex + 1;
}
