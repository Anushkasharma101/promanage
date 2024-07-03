import React from "react";
import "./optionsList.css";
import axios from "axios";

const Optionslist = ({taskId = null, showDelete, options = [], setOptions, setTotalCheck,totalCheck,checkBoxWidth }) => {

  const handleCheckboxChange = async (id,index)  => {
   if(taskId!== null){ try {
      const response = await axios.patch(
        `https://pro-manage-backend-83mj.onrender.com/task/updateCheckMark/${taskId}`,
        { indexOfCheck:index },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Checklist updated successfully", response.data);
      window.location.reload(); // Trigger a reload of tasks
    } catch (error) {
      console.error("Error updating checklist:", error.response ? error.response.data : error.message);
    }}
    if(!options[index].checked){
      setTotalCheck(totalCheck+1);
    }else{
      setTotalCheck(totalCheck-1);
    }
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      )
    );

  };

  const handleInputChange = (id, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, checkListTitle: value } : option
      )
    );
  };

  const handleDelete = (id, index) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.id !== id));
    if (options[index].checked) {
      setTotalCheck(totalCheck - 1);
    }
  };

  return (
    <div className="taskPublicList" >
      {options.map((option,index) => (
        <div key={option.id} className="option-item">
          <input
            type="checkbox"
            checked={option.checked}
            onChange={() => handleCheckboxChange(option.id,index)}
            className="inputCheckBox"
            style={{ width: checkBoxWidth }}
          />
          {option.checked && (
            <img src="assets/Tick.svg" alt="tick" className="tickImg" />
          )}
          <input
            type="text"
            value={option.checkListTitle}
            onChange={(e) => handleInputChange(option.id, e.target.value)}
            placeholder={`Option`}
            className="inputCheckBoxOptions"
          />
          {showDelete && (
            <img
              src="assets/Delete.svg"
              alt="deleteImg"
              className="deleteImg"
              onClick={() => handleDelete(option.id, index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Optionslist;
