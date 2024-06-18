import React from 'react';

const AuthButton = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-8/12 p-2 m-3 outline outline-1 outline-gray-400 rounded-xl text-center bg-default-color hover:bg-sub-color cursor-pointer shadow-md shadow-gray-300"
    >
      {children}
    </button>
  );
};

export default AuthButton;
