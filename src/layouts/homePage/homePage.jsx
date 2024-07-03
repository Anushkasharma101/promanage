import React, { useState,useEffect } from "react";
import "./homePage.css";
import Drawer from "../../components/drawer/drawer";
import CreateTask from "../createtask/createTask";
import LogoutConfirmation from "../../components/logoutConfirmation/logoutConfirmation";
import DeleteConfirmation from "../../components/deleteConfirmation/deleteConfirmation";
import AddPeople from "../../components/addPeople/addPeople";
import EmailAdded from "../../components/emailAdded/emailAdded";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = ({
  setIsLoggedIn,
  children,
  createTask,
  setCreateTask,
  isDeleting,
  setIsDeleting,
  isAddingPeople,
  setIsPeopleAdded,
  assignToArray,
  taskId,
  oldOptions,
  oldTotalCheck,
  oldSelectedEmail,
  oldTitle,
  oldSelectedPriority,
  oldIndexofPriority,
  setOldOptions,
  setOldTotalCheck,
  setOldSelectedEmail,
  setOldTitle,
  setOldSelectedPriority,
  setOldIndexofPriority,
  setTaskId,
  dueDate,
  setDueDate,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [email, setEmail] = useState("");
  const [successfullyEmailSend, setSuccessfullyEmailSend] = useState(false);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (showDeleteToast) {
      toast.success("Task Deleted Successfully"); 
      setShowDeleteToast(false); 
    }
  }, [showDeleteToast]);
  
  return (
    <div className="heroDiv">
      <div className="heroDivLeft">
        <Drawer setIsLoggingOut={setIsLoggingOut} />
      </div>
      <div className="heroDivRight">{children}</div>

      {createTask === true && (
        <CreateTask
          setTaskId={setTaskId}
          taskId={taskId}
          setCreateTask={setCreateTask}
          assignToArray={assignToArray}
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
          setOldIndexOfPriority={setOldIndexofPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      )}
      {isLoggingOut === true && (
        <LogoutConfirmation
          setIsLoggedIn={setIsLoggedIn}
          setIsLoggingOut={setIsLoggingOut}
        />
      )}
      {isDeleting === true && (
        <DeleteConfirmation setIsDeleting={setIsDeleting} taskId={taskId} setShowDeleteToast={setShowDeleteToast}/>
      )}
      {isAddingPeople === true && (
        <AddPeople
          setIsPeopleAdded={setIsPeopleAdded}
          setEmail={setEmail}
          setSuccessfullyEmailSend={setSuccessfullyEmailSend}
          setCreateTask={setCreateTask}
        />
      )}
      {successfullyEmailSend === true && (
        <EmailAdded
          email={email}
          setSuccessfullyEmailSend={setSuccessfullyEmailSend}
          setCreateTask={setCreateTask}
        />
      )}
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default HomePage;
