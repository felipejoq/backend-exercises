const getDayNumberCurrentYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

const dayNumber = getDayNumberCurrentYear(new Date());

if (dayNumber === 256) {
  console.info('Feliz día del programador!');
}
