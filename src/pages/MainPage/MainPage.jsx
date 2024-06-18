import React, { useEffect, useState } from 'react'
import MainImage from '../../assets/images/MainImage.jpg'
import supabase from '../../api/supabaseAPI';

const MainPage = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const Cards = async () => {
            const { data, error } = await supabase.from('recipes').select('*');
            if (error) {
                console.error('데이터 에러', error);
            } else {
                setCards(data);
            }
        };
        Cards();
    }, []);

    return (
        <div>
            <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
                <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
            </div>

            <div alt="설문조사" className="bg-gray-200 w-300 h-32 flex items-center justify-center mt-5"> 설문조사</div>

            <div className="flex flex-wrap justify-center space-x-4 mt-5">
                {cards.slice(0, 4).map((card) => (
                    <div key={card.id} className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                        <img src={card.image_url} alt={card.title} />
                        <div className='p-4'>
                            <hr className="border-gray-300 mb-2" />
                            <h3 className="text-lg font-bold mb-2"> {card.title} </h3>
                            <p className="text-gray-600"> {card.nickname} </p>

                        </div>
                        <p className='text-gray-600 text-sm mt-2'> {new Date(card.created_at).toLocaleDateString()} </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-5">
                <a href='#' className='py-4 px-4 rounded-full bg-sub-color text-center'>레시피 작성</a>
            </div>
        </div >
    )
}

export default MainPage; 