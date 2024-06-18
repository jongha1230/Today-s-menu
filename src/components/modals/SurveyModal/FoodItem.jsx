const FoodItem = ({ food }) => {
  return (
    <li className="mb-2 border-2 border-black border-solid w-96 h-12 text-center py-2.5 rounded-3xl">{food.name}</li>
  );
};

export default FoodItem;
