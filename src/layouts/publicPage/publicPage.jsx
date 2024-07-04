import React, { useEffect, useState } from "react";
import axios from "axios";
import "./publicPage.css";
import { useParams } from "react-router-dom";

const priorityTexts = {
  "HIGH PRIORITY": "HIGH PRIORITY",
  "MODERATE PRIORITY": "MODERATE PRIORITY",
  "LOW PRIORITY": "LOW PRIORITY",
};

const priorityImages = {
  "HIGH PRIORITY": "/assets/redcircle.svg",
  "MODERATE PRIORITY": "/assets/bluecircle.svg",
  "LOW PRIORITY": "/assets/greencircle.svg",
};

const getFormattedDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  return `${month} ${day}${suffix}`;
};

const PublicPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCheck, setTotalCheck] = useState(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `https://pro-manage-backend-83mj.onrender.com/task/getTaskById/${id}`
        );

        setTask(response.data.task);
        // console.log(response.data.task);
        let counter = 0;
        for (let i = 0; i < response.data.task.checkList.length; i++) {
          console.log('trueeeeee if ke bahar');
          if (response.data.task.checkList[i].checked === true) {
            console.log('trueeeeee');
            counter++;
          }
        }

        setTotalCheck(counter);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div className="publicMainPage">
      <div className="proManagePublicPage">
        <img
          src="/assets/codesandbox.svg"
          alt="codesandboxImg"
          className="codesandboxImg"
        />
        <div className="titlePublicPage">Pro Manage</div>
      </div>
      <div className="parentPublicPageCenterDiv">
        <div className="publicPageCenterDiv">
          <div className="commonPublicTaskDiv">
            <img
              src={priorityImages[task.priority]}
              alt={`${task.priority} priority`}
              className="priority-icon"
            />
            <div className="taskPublicPage">{priorityTexts[task.priority]}</div>
          </div>
          <div className="heroSectionPublicPage">{task.title}</div>
          <div className="checkList">
            Checklist ({totalCheck}/{task.checkList.length})
            
          </div>
          <div className="optionListMainDiv">
            <div className="optionsListPublicDiv">
              {task.checkList.map((item) => (
                <div className="checkList-item">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    className="publicCheckBox"
                    readOnly
                  />
                  {item.checked && (
                    <img
                      src="/assets/Tick.svg"
                      alt="tick"
                      className="tickImg"
                    />
                  )}

                  <div className="checkBoxOptions">{item.checkListTitle}</div>
                </div>
              ))}
            </div>
          </div>
          {task.dueDate && (
            <div className="dateDiv">
              <div className="dueDate">Due Date</div>
              <div className="date">{getFormattedDate(task.dueDate)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
