import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthScreen from "./layouts/authScreen/authScreen";
import AddPeople from "./components/addPeople/addPeople";
import EmailAdded from "./components/emailAdded/emailAdded";
import DeleteConfirmation from "./components/deleteConfirmation/deleteConfirmation";
import LogoutConfirmation from "./components/logoutConfirmation/logoutConfirmation";
import HomePage from "./layouts/homePage/homePage";
import Login from "./components/login/login";
import Analytics from "./layouts/analytics/analytics";
import CreateTask from "./layouts/createtask/createTask";
import DashBoard from "./layouts/dashBoard/dashBoard";
import Settings from "./layouts/settings/settings";
import Register from "./components/register/register";
import PublicPage from "./layouts/publicPage/publicPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [globalUserName, setGlobalUserName] = useState("");
  const [globalEmail, setGlobalEmail] = useState("");
  const [assignToArray, setAssignToArray] = useState(null);

  const [backlogTasks, setBacklogTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [lowPriorityTasks, setLowPriorityTasks] = useState(0);
  const [moderatePriorityTasks, setModeratePriorityTasks] = useState(0);
  const [highPriorityTasks, setHighPriorityTasks] = useState(0);
  const [dueDateTasks, setDueDateTasks] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingPeople, setIsPeopleAdded] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [oldOptions, setOldOptions] = useState([]);
  const [oldTotalCheck, setOldTotalCheck] = useState(0);
  const [oldSelectedEmail, setOldSelectedEmail] = useState(null);
  const [oldTitle, setOldTitle] = useState("");
  const [oldSelectedPriority, setOldSelectedPriority] = useState("");
  const [oldIndexofPriority, setOldIndexofPriority] = useState(0);
  const[dueDate,setDueDate] = useState('Select Due Date');

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomePage
                children={
                  <DashBoard
                    setCreateTask={setCreateTask}
                    setGlobalEmail={setGlobalEmail}
                    setGlobalUserName={setGlobalUserName}
                    setBacklogTasks={setBacklogTasks}
                    setCompletedTasks={setCompletedTasks}
                    setDueDateTasks={setDueDateTasks}
                    setHighPriorityTasks={setHighPriorityTasks}
                    setInProgressTasks={setInProgressTasks}
                    setLowPriorityTasks={setLowPriorityTasks}
                    setModeratePriorityTasks={setModeratePriorityTasks}
                    setTodoTasks={setTodoTasks}
                    setAssignToArray={setAssignToArray}
                    setIsDeleting={setIsDeleting}
                    setIsPeopleAdded={setIsPeopleAdded}
                    setTaskId={setTaskId}
                    setOldOptions={setOldOptions}
                    setOldTotalCheck={setOldTotalCheck}
                    setOldSelectedEmail={setOldSelectedEmail}
                    setOldTitle={setOldTitle}
                    setOldSelectedPriority={setOldSelectedPriority}
                    setOldIndexofPriority={setOldIndexofPriority}
                    setDueDate={setDueDate}
                  
                  />
                }

                taskId={taskId}
                assignToArray={assignToArray}
                setIsLoggedIn={setIsLoggedIn}
                createTask={createTask}
                setCreateTask={setCreateTask}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                isAddingPeople={isAddingPeople}
                setIsPeopleAdded={setIsPeopleAdded}
                oldOptions={oldOptions}
                setTaskId={setTaskId}
                oldTotalCheck={oldTotalCheck}
                oldSelectedEmail={oldSelectedEmail}
                oldTitle={oldTitle}
                oldSelectedPriority={oldSelectedPriority}
                oldIndexofPriority={oldIndexofPriority}
                setOldOptions={setOldOptions}
                setOldTotalCheck={setOldTotalCheck}
                setOldSelectedEmail={setOldSelectedEmail}
                setOldTitle={setOldTitle}
                setOldSelectedPriority={setOldSelectedPriority}
                setOldIndexofPriority={setOldIndexofPriority}
                setDueDate={setDueDate}
                dueDate={dueDate}
              />
            ) : (
              <AuthScreen setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        {isLoggedIn ? (
          <>
            <Route
              path="dashboard"
              element={
                <HomePage
                  children={
                    <DashBoard
                      setCreateTask={setCreateTask}
                      setGlobalEmail={setGlobalEmail}
                      setGlobalUserName={setGlobalUserName}
                      setDueDateTasks={setDueDateTasks}
                      setAssignToArray={setAssignToArray}
                      setHighPriorityTasks={setHighPriorityTasks}
                      setLowPriorityTasks={setLowPriorityTasks}
                      setModeratePriorityTasks={setModeratePriorityTasks}
                      setBacklogTasks={setBacklogTasks}
                      setCompletedTasks={setCompletedTasks}
                      setInProgressTasks={setInProgressTasks}
                      setTodoTasks={setTodoTasks}
                      setIsDeleting={setIsDeleting}
                      setIsPeopleAdded={setIsPeopleAdded}
                      setTaskId={setTaskId}
                      setOldOptions={setOldOptions}
                      setOldTotalCheck={setOldTotalCheck}
                      setOldSelectedEmail={setOldSelectedEmail}
                      setOldTitle={setOldTitle}
                      setOldSelectedPriority={setOldSelectedPriority}
                      setOldIndexofPriority={setOldIndexofPriority}
                      setDueDate={setDueDate}
                    />
                  }
                  taskId={taskId}
                  setTaskId={setTaskId}
                  assignToArray={assignToArray}
                  setIsLoggedIn={setIsLoggedIn}
                  createTask={createTask}
                  setCreateTask={setCreateTask}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  isAddingPeople={isAddingPeople}
                  setIsPeopleAdded={setIsPeopleAdded}
                  oldOptions={oldOptions}
                  oldTotalCheck={oldTotalCheck}
                  oldSelectedEmail={oldSelectedEmail}
                  oldTitle={oldTitle}
                  oldSelectedPriority={oldSelectedPriority}
                  oldIndexofPriority={oldIndexofPriority}
                  setOldOptions={setOldOptions}
                  setOldTotalCheck={setOldTotalCheck}
                  setOldSelectedEmail={setOldSelectedEmail}
                  setOldTitle={setOldTitle}
                  setOldSelectedPriority={setOldSelectedPriority}
                  setOldIndexofPriority={setOldIndexofPriority}
                  setDueDate={setDueDate}
                  dueDate={dueDate}
                />
              }
            />
            <Route
              path="analytics"
              element={
                <HomePage
                  children={
                    <Analytics
                      backlogTasks={backlogTasks}
                      todoTasks={todoTasks}
                      inProgressTasks={inProgressTasks}
                      completedTasks={completedTasks}
                      lowPriorityTasks={lowPriorityTasks}
                      moderatePriorityTasks={moderatePriorityTasks}
                      highPriorityTasks={highPriorityTasks}
                      dueDateTasks={dueDateTasks}
                    />
                  }
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="settings"
              element={
                <HomePage
                  children={
                    <Settings
                      globalEmail={globalEmail}
                      globalUserName={globalUserName}
                    />
                  }
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="createtask"
              element={<CreateTask setCreateTask={setCreateTask} />}
            />
            <Route path="addpeople" element={<AddPeople />} />
            <Route path="emailadded" element={<EmailAdded />} />
            <Route path="deleteconfirmation" element={<DeleteConfirmation />} />
            <Route path="logoutconfirmation" element={<LogoutConfirmation />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        <Route path="/publicPage/:id" element={<PublicPage />} />
      </Routes>
    </div>
  );
}

export default App;
