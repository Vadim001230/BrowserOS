const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getNumberOfDay(day) {
  let num = -1;
  day = day.toLowerCase();
  days.forEach((elem, index) => {
    if (day.startsWith(elem.toLowerCase())) {
      num = index + 1;
    }
  });
  return num;
}
