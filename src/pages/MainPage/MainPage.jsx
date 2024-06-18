import React from 'react'
import MainImage from '../../assets/images/MainImage.jpg'


const MainPage = () => {
    return (
        <div>
            <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
                <img src={MainImage} alt="음식사진" className="object-cover w-full h-full" />
            </div>

            <div alt="설문조사" className="bg-gray-200 w-300 h-32 flex items-center justify-center mt-5"> 설문조사</div>

            <div className="flex flex-wrap justify-center space-x-4 mt-5">
                <div className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                    <h3 className="text-lg font-bold mb-2"> 음식 1 </h3>
                    <p className="text-gray-600"> 사용자1 </p>
                </div>
                <div className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                    <h3 className="text-lg font-bold mb-2"> 음식 2</h3>
                    <p className="text-gray-600"> 사용자2 </p>
                </div>
                <div className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                    <h3 className="text-lg font-bold mb-2"> 음식 3</h3>
                    <p className="text-gray-600"> 사용자3 </p>
                </div>
                <div className="bg-white w-52 h-48 rounded-lg p-4 border-2">
                    <h3 className="text-lg font-bold mb-2"> 음식 4</h3>
                    <p className="text-gray-600"> 사용자4 </p>
                </div>

                <div>
                    <a href='#' className='py-4 px-2 rounded-full bg-buttonPink'> 레시피 추가하기 </a>
                </div>
            </div>
        </div >
    )
}

export default MainPage; 