import React, { useEffect, useState } from 'react'
import MainImage from '../../assets/images/MainImage.jpg'
import supabase from '../../api/supabaseAPI';
import SearchIcon from '@mui/icons-material/Search';

const MainPage = ({ onSearch }) => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const Cards = async () => {
            const { data, error } = await supabase.from('recipes').select('*');
            if (error) {
                console.error('데이터 에러', error);
            } else {
                setCards(data);
                setFilteredCards(data);
            }
        };
        Cards();
    }, []);

    useEffect(() => {
        const filtered = cards.filter(card =>
            card.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCards(filtered);
    }, [cards, searchTerm]);

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div>
            <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
                <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
            </div>

            <div alt="설문조사" className="bg-gray-200 w-300 h-32 flex items-center justify-center mt-5"> 설문조사</div>

            {/* 검색 기능 */}
            <div className='flex items-center justify-center mt-5'>
                <div className='flex items-center bg-white rounded-md px-3 border-2'>
                    <input
                        type='text'
                        placeholder='검색어를 입력하세요.'
                        className='outline-none w-40 sm:w-64 text-sm'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className='outline-none' onClick={handleSearch}>
                        <SearchIcon />
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center space-x-4 mt-5">
                {filteredCards.slice(0, 4).map((card) => (
                    <div key={card.id} className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                        <img src={card.image_url} alt={card.title} />
                        <div className='p-4'>
                            <hr className="border-gray-300 mb-2" />
                            <h3 className="text-lg font-bold mb-2"> {card.title} </h3>
                            <p className="text-gray-600"> {card.nickname} </p>
                            {/* <p className="text-gray-600"> {card.content} </p> */}

                        </div>
                        <p className='text-gray-600 text-sm mt-2'> {new Date(card.created_at).toLocaleDateString()} </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-5">
                <a href='#' className='py-4 px-4 rounded-full bg-sub-color hover:bg-default-color  text-center mb-5'>레시피 작성</a>
            </div>
        </div >
    )
}

export default MainPage; 