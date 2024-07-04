import React, { useState, useEffect } from "react";
import "./dashBoard.css";
import TaskCard from "../../components/taskCard/taskCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const filterTasksByDate = (tasks, timeRange) => {
  const today = new Date();
  let startDate;

  switch (timeRange) {
    case "today":
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      break;
    case "thisWeek":
      startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
      break;
    case "thisMonth":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    default:
      throw new Error("Invalid time range. Use 'today', 'thisWeek', or 'thisMonth'.");
  }

  return tasks.filter(task => {
    const taskDate = new Date(task.currentDate); // Assuming task.currentDate is the property containing the task date
    return taskDate >= startDate && taskDate <= today;
  });
};

const DashBoard = ({
  setCreateTask,
  setGlobalUserName,
  setGlobalEmail,
  setBacklogTasks,
  setTodoTasks,
  setInProgressTasks,
  setCompletedTasks,
  setLowPriorityTasks,
  setModeratePriorityTasks,
  setHighPriorityTasks,
  setDueDateTasks,
  setIsDeleting,
  setIsPeopleAdded,
  setAssignToArray,
  setTaskId,
  setOldOptions,
  setOldTotalCheck,
  setOldSelectedEmail,
  setOldTitle,
  setOldSelectedPriority,
  setOldIndexofPriority,
  setDueDate,
  isLoading
}) => {
  
  const [username, setUserName] = useState("");
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    done: [],
  });

  const [collapsedTasks, setCollapsedTasks] = useState({
    backlog: [],
    todo: [],
    inprogress: [],
    done: [],
  });
  const [filter,setFilter]=useState('thisWeek')
  useEffect(() => {
    // Fetch user details and tasks from the API
    const fetchUserDetails = async () => {
      try {
        const userToken = localStorage.getItem("token");
        const response = await axios.get(
          "https://pro-manage-backend-83mj.onrender.com/user/getUserDetails",
          {
            headers: {
              // Add your authorization header here if needed
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        
        const data = response.data;
        setTodoTasks(data.todo.length);
        setBacklogTasks(data.backlog.length);
        setInProgressTasks(data.inProgress.length);
        setCompletedTasks(data.done.length);
        setAssignToArray(data.assignedUsers);
        let moderatePriorityTasksCount = 0;
        let lowPriorityTasksCount = 0;
        let highPriorityTasksCount = 0;
        let dueDateTasksCount = 0;
        

        for (let i = 0; i < data.todo.length; i++) {
          if (data.todo[i].priority === "LOW PRIORITY") {
            lowPriorityTasksCount += 1;
          } else if (data.todo[i].priority === "MODERATE PRIORITY") {
            moderatePriorityTasksCount += 1;
          } else if (data.todo[i].priority === "HIGH PRIORITY") {
            highPriorityTasksCount += 1;
          }
          if (data.todo[i].dueDate != null) {
            dueDateTasksCount += 1;
          }
        }
        for (let i = 0; i < data.backlog.length; i++) {
          if (data.backlog[i].priority === "LOW PRIORITY") {
            lowPriorityTasksCount += 1;
          } else if (data.backlog[i].priority === "MODERATE PRIORITY") {
            moderatePriorityTasksCount += 1;
          } else if (data.backlog[i].priority === "HIGH PRIORITY") {
            highPriorityTasksCount += 1;
          }
          if (data.backlog[i].dueDate != null) {
            dueDateTasksCount += 1;
          }
        }
        for (let i = 0; i < data.inProgress.length; i++) {
          if (data.inProgress[i].priority === "LOW PRIORITY") {
            lowPriorityTasksCount += 1;
          } else if (data.inProgress[i].priority === "MODERATE PRIORITY") {
            moderatePriorityTasksCount += 1;
          } else if (data.inProgress[i].priority === "HIGH PRIORITY") {
            highPriorityTasksCount += 1;
          }
          if (data.inProgress[i].dueDate != null) {
            dueDateTasksCount += 1;
          }
        }
        for (let i = 0; i < data.done.length; i++) {
          if (data.done[i].priority === "LOW PRIORITY") {
            lowPriorityTasksCount += 1;
          } else if (data.done[i].priority === "MODERATE PRIORITY") {
            moderatePriorityTasksCount += 1;
          } else if (data.done[i].priority === "HIGH PRIORITY") {
            highPriorityTasksCount += 1;
          }
          if (data.done[i].dueDate != null) {
            dueDateTasksCount += 1;
          }
        }

        setLowPriorityTasks(lowPriorityTasksCount);
        setModeratePriorityTasks(moderatePriorityTasksCount);
        setHighPriorityTasks(highPriorityTasksCount);
        setDueDateTasks(dueDateTasksCount);

        setUserName(data.username);
        const filterToDo = filterTasksByDate(data.todo,filter);
        const filterBacklog = filterTasksByDate(data.backlog,filter);
        const filterProgess = filterTasksByDate(data.inProgress,filter);
        const filterDone = filterTasksByDate(data.done,filter);

        setTasks({
          backlog: filterBacklog,
          todo: filterToDo,
          inprogress: filterProgess,
          done: filterDone,
        });

        setGlobalEmail(data.email);
        setGlobalUserName(data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [filter, setAssignToArray, setBacklogTasks, setCompletedTasks, setDueDateTasks, setGlobalEmail, setGlobalUserName, setHighPriorityTasks, setInProgressTasks, setLowPriorityTasks, setModeratePriorityTasks, setTodoTasks]);

  

  const handleFilterChange = (filterAdded) => {
    setFilter(filterAdded)
    console.log("Selected filter:sdfdsfdsafadsfdsfasd", filterAdded);
  };

  const handleAddPeople = () => {
    setIsPeopleAdded(true);
  };

  const toggleTaskOptions = (category, taskIndex) => {
    setCollapsedTasks((prevState) => {
      const categoryTasks = prevState[category];
      const isCollapsed = categoryTasks.includes(taskIndex);
      const updatedTasks = isCollapsed
        ? categoryTasks.filter((index) => index !== taskIndex)
        : [...categoryTasks, taskIndex];

      return { ...prevState, [category]: updatedTasks };
    });
  };

  const collapseCategory = (category) => {
    setCollapsedTasks((prevState) => ({
      ...prevState,
      [category]: tasks[category].map((_, index) => index),
    }));
  };

  const handleAddTaskClick = () => {
    setCreateTask(true);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.toLocaleString("default", { month: "short" });
    const year = currentDate.getFullYear();

    const formattedDay = addOrdinalSuffix(day);

    return `${formattedDay} ${month}, ${year}`;
  };

  const addOrdinalSuffix = (day) => {
    if (day === 1 || day === 21 || day === 31) {
      return `${day}st`;
    } else if (day === 2 || day === 22) {
      return `${day}nd`;
    } else if (day === 3 || day === 23) {
      return `${day}rd`;
    } else {
      return `${day}th`;
    }
  };

  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    if (shareToast) {
      toast.success("Link Copied");
      setShareToast(false);
    }
  }, [shareToast]);

  const handleShareToast = () => {
    setShareToast(true);
  };

  return (
    <div className="dashBoardMainDiv">
    <ToastContainer position="top-right"/>
      <div className="userName">Welcome! {username}</div>
      <div className="userDashBoardDate">{getCurrentDate()}</div>
      <div className="boardTitleMainDiv">
        <div className="commonDashBoardDiv">
          <div className="boardDashBoard">Board</div>
          <div className="addPeopleDashBoardDiv" onClick={handleAddPeople}>
            <img
              src="/assets/Add People.svg"
              alt="addpeople"
              className="addPeopleDashBoardImg"
            />
            <div className="addPeopleDashboardText">Add People</div>
          </div>
        </div>
        <div className="taskFilters">
          <select onChange={(e) => handleFilterChange(e.target.value)} className="filterDropDown">
            <option value="thisWeek" className="dropDownOption">
              This week
            </option>
            <option  value="today" className="dropDownOption">
              Today
            </option>
            <option value="thisMonth" className="dropDownOption">
              This Month
            </option>
          </select>
        </div>
      </div>
      <div className="taskDashBoardListMainDiv">
        <div className="taskDashBoardList">
          {Object.keys(tasks).map((category) => (
            <div className="taskCategory" key={category}>
              <div className="categoryTitle">
                <div
                  className={`category${
                    category.charAt(0).toUpperCase() + category.slice(1)
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                <div className="commonCategoryGroup">
                  {category === "todo" && (
                    <img
                      src="/assets/Add.svg"
                      alt="addTask"
                      className="addTaskImg"
                      onClick={handleAddTaskClick}
                    />
                  )}
                 <img
                    src="/assets/codicon_collapse-all.svg"
                    alt="collapseimg"
                    className={`collapseImg ${
                      tasks[category].length === 0 ? "disabled" : ""
                    }` }
                    onClick={() => collapseCategory(category)}
                    style={{
                      cursor: tasks[category].length === 0 ? "not-allowed" : "pointer",
                    }}
                    disabled={tasks[category].length === 0}
                  />
                </div>
              </div>
              <div className="dashboardTasks">
                {tasks[category].map((task, index) => (
                  <TaskCard
                    key={index}
                    task={task}
                    isOptionsExpanded={
                      !collapsedTasks[category].includes(index)
                    }
                    onToggleOptions={() => toggleTaskOptions(category, index)}
                    setIsDeleting={setIsDeleting}
                    setTaskId={setTaskId}
                    setOldOptions={setOldOptions}
                    setOldTotalCheck={setOldTotalCheck}
                    setOldSelectedEmail={setOldSelectedEmail}
                    setOldTitle={setOldTitle}
                    setOldSelectedPriority={setOldSelectedPriority}
                    setOldIndexofPriority={setOldIndexofPriority}
                    setCreateTask={setCreateTask}
                    setDueDate={setDueDate}
                    handleShareToast={handleShareToast}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
