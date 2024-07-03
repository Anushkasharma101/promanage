import React from 'react';
import './category.css';

const Category = ({priorityBgColor, priorityTextColor, onClick, prioritytext}) => {
    const prioritybuttonStyle = {
        backgroundColor: priorityBgColor,
        color: priorityTextColor
      };
  return (
    <button style={prioritybuttonStyle} className="priorityButton" onClick={onClick}>
    {prioritytext}
  </button>
  )
}

export default Category