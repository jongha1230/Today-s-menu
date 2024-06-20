import React from 'react';

const AuthInput = ({ type, placeholder, name, value, handler, required }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handler}
      className="w-full p-1 outline outline-offset-2 outline-gray-400 rounded-md"
      required={required}
    />
  );
};

export default AuthInput;
