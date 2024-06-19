import SearchIcon from '@mui/icons-material/Search';
import React, { useCallback, useEffect, useState } from 'react';
import { LuPointer } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import supabase from '../../api/supabaseAPI';
import MainImage from '../../assets/images/MainImage.jpg';
import SurveyModal from '../../components/modals/SurveyModal/SurveyModal';

const MainPage = ({ onSearch }) => {
    const [cards, setCards] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        const filtered = cards.filter((card) => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredCards(filtered);
    }, [cards, searchTerm]);

    const handleSearch = useCallback(() => {
        onSearch(searchTerm);
    }, [onSearch, searchTerm]);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
                <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
            </div>

            <div className="flex flex-col items-center justify-center">
                <button
                    alt="설문조사"
                    className="bg-theme-color py-4 px-4 flex items-center justify-center mt-10 text-3xl font-medium rounded-full "
                    type="button"
                    onClick={handleModalToggle}
                >
                    {' '}
                    오늘 뭐 먹지?
                </button>
                <LuPointer
                    style={{ fontSize: '50px', position: 'relative', left: '100px', top: '-20px', transform: 'rotate(-30deg)' }}
                />
                <SurveyModal isModalOpen={isModalOpen} toggleModal={handleModalToggle} />
            </div>

            {/* 검색 기능 */}
            <div className="flex items-center justify-center mt-2">
                <div className="flex items-center bg-white rounded-md px-3 border-2">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요."
                        className="outline-none w-40 sm:w-64 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="outline-none" onClick={handleSearch}>
                        <SearchIcon />
                    </button>
                </div>

                <div className="flex justify-center mt-5">
                    <Link
                        href="/test"
                        className="py-4 px-4 rounded-full  bg-sub-color hover:bg-default-color text-center mb-5 ml-10"
                    >
                        레시피 작성
                    </Link>
                </div>
            </div>

            <div className='flex justify-center mt-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card) => (
                            <div key={card.recipeId} className="bg-white w-52 h-74 rounded-lg p-4 border-2 mb-5 m-2">
                                <div>
                                    <img src={card.thumbnail} alt={card.title} className="object-cover w-full rounded-lg" />
                                </div>
                                <div className="p-4">
                                    <hr className="border-gray-300 mb-2" />
                                    <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                                    <p className="text-gray-600 mb-1 text-sm justify-between=">
                                        {card.nickname} {new Date(card.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full h-[370px] flex items-start justify-center">검색 결과가 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
