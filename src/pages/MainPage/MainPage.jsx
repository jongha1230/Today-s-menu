import React from 'react'
import Mainimage from '../../components/images/Mainimage.jpg'


const MainPage = () => {
    return (
        <div>
            <div alt="사진박스" className="bg-gray-200 w-300 h-48 flex items-center justify-center mt-5">
                <img src={Mainimage} alt="음식사진" className="object-cover w-full h-full" />
            </div>

            <div alt="설문조사" className="bg-gray-200 w-300 h-32 flex items-center justify-center mt-5"> 설문조사</div>
        </div >
    )
}

export default MainPage; 