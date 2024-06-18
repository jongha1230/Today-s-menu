const selectRandomFoods = (sortedFoods) => {
  const topFoods = [];
  if (sortedFoods.length <= 2) return sortedFoods;

  let currentScore = sortedFoods[0].score;
  let sameScoreFoods = sortedFoods.filter((food) => food.score === currentScore);

  while (topFoods.length < 2 && sortedFoods.length > 0) {
    const randomIndex = Math.floor(Math.random() * sameScoreFoods.length);
    const selectedFood = sameScoreFoods.splice(randomIndex, 1)[0];
    topFoods.push(selectedFood);

    if (sameScoreFoods.length === 0) {
      const nextFoods = sortedFoods.filter((food) => food.score !== currentScore);
      if (nextFoods.length > 0) {
        currentScore = nextFoods[0].score;
        sameScoreFoods = sortedFoods.filter((food) => food.score === currentScore);
      }
    }
  }
  return topFoods;
};

export default selectRandomFoods;
