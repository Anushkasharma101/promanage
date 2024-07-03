import React, { useEffect, useState } from "react";
import "./taskCard.css";
import Optionslist from "../optionsList/optionsList";
import Category from "../category/category";
import axios from "axios";

const priorityImages = {
  "HIGH PRIORITY": "assets/redcircle.svg",
  "MODERATE PRIORITY": "assets/bluecircle.svg",
  "LOW PRIORITY": "assets/greencircle.svg",
};

const TaskCard = ({
  task,
  isOptionsExpanded,
  onToggleOptions,
  setIsDeleting,
  setTaskId,
  setCreateTask,
  setOldOptions,
  setOldTotalCheck,
  setOldSelectedEmail,
  setOldTitle,
  setOldSelectedPriority,
  setOldIndexofPriority,
  setDueDate
}) => {
  const {
    _id,
    title,
    priority,
    assignedToEmail,
    category,
    checkList,
    dueDate,
  } = task;
  const [checklistCompleted, setCheckedListCompleted] = useState(0);
  const checklistTotal = checkList.length;
  const [openMenuTaskId, setOpenMenuTaskId] = useState(null);

  useEffect(() => {
    let counter=0;
    for (let i = 0; i < checkList.length; i++) {
      if (checkList[i].checked === true) {
        counter++;
      }
    }
    setCheckedListCompleted(counter);
    
  }, [category, checkList, checklistCompleted]);

  const assignedInitials = assignedToEmail
    ? assignedToEmail.substring(0, 2).toUpperCase()
    : "";

  const opentoggleMenu = () => {
    if (openMenuTaskId === _id) {
      setOpenMenuTaskId(null);
    } else {
      setOpenMenuTaskId(_id);
    }
  };

  const handleEdit = () => {
    setOldOptions(checkList);
    setOldTotalCheck(checklistCompleted);
    setOldSelectedEmail(assignedToEmail);
    setOldTitle(title);
    setOldSelectedPriority(priority);
    setOldIndexofPriority();
    setCreateTask(true);
    setDueDate(dueDate);
    setTaskId(_id);

  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/publicPage/${_id}`)
      .then(() => {
        console.log("Text copied to clipboard successfully");
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard: ", err);
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTaskId(_id);
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                   (day === 2 || day === 22) ? 'nd' :
                   (day === 3 || day === 23) ? 'rd' : 'th';

    return `${month} ${day}${suffix}`;
  };

  const updateTaskCategory = async (taskId, newCategory) => {
    try {
      const response = await axios.patch(
        `https://pro-manage-backend-83mj.onrender.com/task/updateCategory/${taskId}`,
        {
          category: newCategory,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="taskCardDiv">
      <div className="taskHeaderDetails">
        <div className="priorityDiv">
          <img
            src={priorityImages[priority]}
            alt={`${priority} priority`}
            className="priority-icon"
          />
          <div className="priorityText">{priority}</div>
          {assignedToEmail!==null && (
            <div className="assignedEmail">{assignedInitials}</div>
          )}
        </div>
        {/* <div className="menuParentDiv"> */}
        <img
          src="assets/threedots.svg"
          alt="threedots"
          className="threeDots"
          onClick={opentoggleMenu}
        />
        {openMenuTaskId === _id && (
          <div className="menuBox">
            <div className="menuItem" onClick={handleEdit}>
              Edit
            </div>
            <div className="menuItem" onClick={handleShare}>
              Share
            </div>
            <div className="menuItem" onClick={handleDelete}>
              Delete
            </div>
          </div>
        )}
        {/* </div> */}
      </div>
      <div className="taskDetails">
        <h3 className="taskName">{title}</h3>
        <div className="commonCheckListDiv">
          <div className="checklistTaskDiv">
            Checklist ({checklistCompleted}/{checklistTotal})
          </div>
          <img
            src={
              isOptionsExpanded ? "assets/downarrow.svg" : "assets/uparrow.svg"
            }
            alt="arrow"
            className="downArrowImg"
            onClick={onToggleOptions}
          />
        </div>
        <div className="taskOptionDiv">
          {isOptionsExpanded && (
            <Optionslist taskId={_id} options={checkList} showDelete={false} checkBoxWidth="8%"/>
          )}
        </div>
        <div className="categoryTaskButtons">
          <div className="taskButtonFirstDiv">
          {task.dueDate && (
              <Category
                priorityBgColor={category === 'Done' ? "#63C05B" : "#DBDBDB"}
                priorityTextColor={category === 'Done' ? "#FFFFFF" : "#5A5A5A"}
                prioritytext={getFormattedDate(task.dueDate)}
                onClick={() => {}}
              />
            )}
          </div>
          <div className="taskButtonSecondDiv">
            {category !== "Backlog" && (
              <div className="firstDiv">
                <Category
                  priorityBgColor={"#EEECEC"}
                  priorityTextColor={"#767575"}
                  prioritytext={"BACKLOG"}
                  onClick={() => {
                    updateTaskCategory(_id, "Backlog");
                  }}
                />
              </div>
            )}

            {category !== "To do" && (
              <div className="secondDiv">
                <Category
                  priorityBgColor={"#EEECEC"}
                  priorityTextColor={"#767575"}
                  prioritytext={"TO-DO"}
                  onClick={() => {
                    updateTaskCategory(_id, "To do");
                  }}
                />
              </div>
            )}

            {category !== "In progress" && (
              <div className="firstDiv">
                <Category
                  priorityBgColor={"#EEECEC"}
                  priorityTextColor={"#767575"}
                  prioritytext={"PROGRESS"}
                  onClick={() => {
                    updateTaskCategory(_id, "In progress");
                  }}
                />
              </div>
            )}
            {category !== "Done" && (
              <div className="thirdDiv">
                <Category
                  priorityBgColor={"#EEECEC"}
                  priorityTextColor={"#767575"}
                  prioritytext={"DONE"}
                  onClick={() => {
                    updateTaskCategory(_id, "Done");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
