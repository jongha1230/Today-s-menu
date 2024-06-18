import FoodItem from './FoodItem';

const FoodList = ({ foods }) => {
  return (
    <ul className="list-none">
      {foods.length ? (
        foods.map((food, index) => <FoodItem key={index} food={food} />)
      ) : (
        <li className="mb-2 border-2 border-black border-solid w-96 h-12 text-center py-2.5 rounded-3xl">
          추천할 음식이 없습니다.
        </li>
      )}
    </ul>
  );
};

export default FoodList;
