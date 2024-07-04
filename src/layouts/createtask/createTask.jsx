import React, { useEffect, useState } from "react";
import "./createTask.css";
import Optionslist from "../../components/optionsList/optionsList";
import CommonButton from "../../components/commonButton/commonButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from "react-loader-spinner";

const priorityTexts = {
  "HIGH PRIORITY": "HIGH PRIORITY",
  "MODERATE PRIORITY": "MODERATE PRIORITY",
  "LOW PRIORITY": "LOW PRIORITY",
};

const priorityImages = {
  "HIGH PRIORITY": "assets/redcircle.svg",
  "MODERATE PRIORITY": "assets/bluecircle.svg",
  "LOW PRIORITY": "assets/greencircle.svg",
};

const CreateTask = ({
  setCreateTask,
  assignToArray,
  oldOptions = [],
  oldTotalCheck = 0,
  oldSelectedEmail = null,
  oldTitle = "",
  oldSelectedPriority = "",
  setOldOptions,
  setOldTotalCheck,
  setOldSelectedEmail,
  setOldTitle,
  setOldSelectedPriority,
  setOldIndexOfPriority,
  taskId = "",
  setTaskId,
  dueDate = "Select Due Date",
  setDueDate,
}) => {
  const [options, setOptions] = useState(oldOptions);
  const [totalCheck, setTotalCheck] = useState(oldTotalCheck);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(oldSelectedEmail);
  const [title, setTitle] = useState(oldTitle);
  const [selectedPriority, setSelectedPriority] = useState(oldSelectedPriority);
  const [indexOfPriority, setIndexOfPriority] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSelectDueDate = () => {
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsCalendarOpen(false);
  };

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, { id: prevOptions.length }]);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setIsDropdownOpen(false);
  };

  const formatEmail = (email) => {
    const firstTwoChars = email.slice(0, 2).toUpperCase();
    return `${firstTwoChars}`;
  };

  useEffect(() => {
    if (taskId !== "") {
      let counter = 0;
      for (let i = 0; i < oldOptions.length; i++) {
        if (oldOptions[i].checked === true) {
          counter++;
        }
      }

      setTotalCheck(counter);
    }
  }, [taskId, oldOptions]);

  const handleCancel = () => {
    setOldOptions([]);
    setOldTotalCheck(0);
    setOldSelectedEmail(null);
    setOldTitle("");
    setTaskId("");
    setDueDate("Select Due Date");
    setOldSelectedPriority("");
    setOldIndexOfPriority(oldSelectedPriority);
    setCreateTask(false);
  };
  const updateTask = async () => {
    const userToken = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://pro-manage-backend-83mj.onrender.com/task/updateTask/${taskId}`,
        {
          title,
          checkList: options,
          dueDate:
            startDate === null ? null : startDate.toLocaleDateString("en-GB"),
          assignedTo: selectedEmail,
          priority: selectedPriority,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log("Task updated:", response.data);
      handleCancel();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleSave = async () => {
    if (!title) {
      toast.error("Please Enter Title");
      return;
    }
    if (!selectedPriority) {
      toast.error("Please Select Priority");
      return;
    }
    if (options.length === 0) {
      toast.error("Please Add Tasks");
      return;
    }
    const userToken = localStorage.getItem("token");
    setLoading(true);
    try {
      const updatedList = options.map((option) => ({
        checkListTitle: option.checkListTitle,
        checked: option.checked,
      }));
      console.log(updatedList, title, priorityTexts[indexOfPriority]);
      const response = await axios.post(
        "https://pro-manage-backend-83mj.onrender.com/task/createTask",
        {
          title: title,
          priority: priorityTexts[indexOfPriority],
          checkList: updatedList,
          assignedTo: selectedEmail === "" ? null : selectedEmail,
          dueDate: startDate === "Select Due Date" ? null : startDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Task Successfully Created", response.data);
      handleCancel(); // Navigate to a different route on success
      window.location.reload();
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response ? error.response.data : error.message
      );
    }
    setLoading(false);
  };

  return (
    <div className="createTaskMainDiv">
      <ToastContainer position="top-center" />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      )}
      <div className="createTaskCenterDiv">
        {isCalendarOpen && (
          <Calendar onChange={handleDateChange} value={startDate} />
        )}
        {isDropdownOpen && (
          <div className="parentEmailDiv">
            <div className="emailDropdown">
              {assignToArray.map((email) => (
                <div key={email} className="emailDropdownItem">
                  <div className="dropDownEmail">
                    <span className="formattedEmail">{formatEmail(email)}</span>
                    <span className="fullEmail">{email}</span>
                  </div>
                  <div className="assignEmailDiv">
                    <CommonButton
                      text={"Assign"}
                      textColor={"#767575"}
                      buttonColor={"#fff"}
                      border={"1px solid #E2E2E2"}
                      onClick={() => handleEmailClick(email)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="createTaskTitle">
          <div className="commonTitleDiv">
            Title <span className="asterisk">*</span>
          </div>
          <div className="createTaskTitleDiv">
            <input
              type="text"
              placeholder="Enter Task Title"
              className="taskTitleName"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="selectPriorityDiv">
          <div className="commonSelectPriorityDiv">
            <div className="selectPriority">Select Priority</div>
            <span className="asterisk">*</span>
          </div>
          <div className="createTaskPriorityDiv">
            {Object.keys(priorityTexts).map((key) => (
              <div
                key={key}
                className="priorityItem"
                style={{
                  backgroundColor:
                    selectedPriority === key ? "#EEECEC" : "#fff",
                }}
                onClick={() => {
                  setSelectedPriority(key);
                  setIndexOfPriority(key);
                }}
              >
                <div className="createTaskPriorityImageDiv">
                  <img
                    src={priorityImages[key]}
                    alt={`${key} priority`}
                    className="priority-icon"
                  />
                </div>

                <div className="createTaskpriorityText">
                  {priorityTexts[key]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {assignToArray.length !== 0 && (
          <div className="createTaskAssignEmail">
            <div className="assignToText">Assign to</div>
            <div className="createTaskAssignEmailDiv">
              <input
                type="email"
                placeholder="Add a assignee"
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
                className="assignedEmailText"
                onFocus={() => setIsDropdownOpen(true)}
              />
              <img
                src="assets/uparrow.svg"
                alt="uparrow"
                className="createuparrownImg"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            </div>
          </div>
        )}

        <div className="createTaskChecklist">
          <div className="commoncreateTaskChecklist">
            <div className="createTaskChecklistText">
              Checklist({totalCheck}/{options.length})
            </div>
            <span className="asterisk">*</span>
          </div>
        </div>
        <div className="createTaskOptionDiv">
          <div className="optionsContainer">
            <Optionslist
              options={options}
              setOptions={setOptions}
              showDelete={true}
              setTotalCheck={setTotalCheck}
              totalCheck={totalCheck}
              checkBoxWidth="3%"
            />
          </div>
        </div>
        <div className="addNewDiv">
          <img
            src="assets/addnew.svg"
            alt="addnew"
            className="addNewImg"
            onClick={addOption}
          />
          <span className="addNew" onClick={addOption}>
            Add New
          </span>
        </div>
        <div className="bottomButtons">
          <div className="selectDueDateDiv">
            <CommonButton
              text={
                dueDate === "Select Due Date"
                  ? startDate
                    ? startDate.toLocaleDateString("en-GB")
                    : "Select Due Date"
                  : dueDate
              }
              textColor={"#707070"}
              buttonColor={"#fff"}
              border={"1px solid #E2E2E2"}
              boxshadow={"none"}
              onClick={handleSelectDueDate}
            />
          </div>
          <div className="bottomButtonsGroup">
            <CommonButton
              text={"Cancel"}
              textColor={"#CF3636"}
              buttonColor={"#fff"}
              border={"1px solid #CF3636"}
              boxshadow={"none"}
              onClick={handleCancel}
            />
            <CommonButton
              text={"Save"}
              textColor={"#fff"}
              buttonColor={"#17A2B8"}
              border={"#17A2B8"}
              boxshadow={"none"}
              onClick={() => {
                taskId !== "" ? updateTask() : handleSave();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
