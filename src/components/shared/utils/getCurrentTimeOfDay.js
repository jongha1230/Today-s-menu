export const getCurrentTimeOfDay = () => {
  const currentHour = new Date().getHours();
  let timeOfDay = '';

  switch (true) {
    case currentHour >= 6 && currentHour < 10:
      timeOfDay = '아침';
      break;
    case currentHour >= 10 && currentHour < 14:
      timeOfDay = '점심';
      break;
    case currentHour >= 14 && currentHour < 20:
      timeOfDay = '저녁';
      break;
    default:
      timeOfDay = '오늘';
      break;
  }

  return timeOfDay;
};
