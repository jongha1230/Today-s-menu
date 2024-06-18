const sortFoodsByScore = (foods) => {
  return [...foods].sort((a, b) => b.score - a.score);
};

export default sortFoodsByScore;
