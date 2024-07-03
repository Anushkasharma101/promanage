import React from 'react';
import './commonButton.css';

const CommonButton = ({textColor, buttonColor, text,onClick,border,boxshadow}) => {
    const commonbuttonStyle = {
    color: textColor,
    backgroundColor: buttonColor,
    border: border,
    boxshadow: boxshadow   
  };

  return (
    <button style={commonbuttonStyle} onClick={onClick} className='commonButton'> 
        {text}
    </button>
  )
}

export default CommonButton;

