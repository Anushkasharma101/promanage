import React from 'react';
import './profileButtons.css';

const ProfileButton = ({ textColor, buttonColor, text,onClick }) => {
  const buttonStyle = {
    color: textColor,
    backgroundColor: buttonColor
  };

  return (
    <button style={buttonStyle} onClick={onClick} className='profileButton'>
      {text}
    </button>
  );
};

export default ProfileButton;
