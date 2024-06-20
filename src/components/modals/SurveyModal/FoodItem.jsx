import foodImage from '../../../assets/images/default-food-image.png';

const FoodItem = ({ food }) => {
  return (
    <li className="flex border-2 border-black border-solid w-full h-44 text-center items-center gap-20 px-4 py-2.5 rounded-3xl">
      <img src={foodImage} alt={food.name} className="w-24 h-24 object-cover" />
      <div className="flex flex-col items-start gap-2">
        <h6 className="font-bold">{food.name}</h6>
        <p>음식 종류: {food.type}</p>
        <p>알레르기: {food.allergies.length > 0 ? food.allergies.join(', ') : '없음'}</p>
      </div>
    </li>
  );
};
export default FoodItem;
