import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const Header = () => {

  return (
    <div className='bg-theme-color'>
      <header className='flex items-center justify-between p-5'>
        <h1 className='text-xl font-medium' > 오늘 뭐먹지? </h1>
        <div className='flex items-center space-x-4'>
          <span> 사용자님 </span>
          <span className='cursor-pointer'> 마이페이지 </span>
          <a href='/logIn' className='bg-black text-white px-4 py-2 rounded'> 로그인 </a>
        </div>
      </header>
    </div>
  )
}
