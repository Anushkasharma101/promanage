import React, { useState } from "react";
import "./analytics.css";

const Analytics = ({
  backlogTasks,
  todoTasks,
  inProgressTasks,
  completedTasks,
  lowPriorityTasks,
  moderatePriorityTasks,
  highPriorityTasks,
  dueDateTasks,
}) => {
  return (
    <div className="analyticsMainDiv">
      <div className="analyticsTitle">Analytics</div>
      <div className="analyticsParentDiv">
        <div className="analyticsDiv">
          <ul className="taskslist">
            <li className="tasks">
              <p className="analyticsTask">Backlog Tasks</p>
              <span className="analyticsTaskCount">{backlogTasks}</span>
            </li>
            <li className="tasks">
              <p className="analyticsTask">To-do Tasks</p> 
              <span className="analyticsTaskCount">{todoTasks}</span>
            </li>
            <li className="tasks">
              <p className="analyticsTask">In-Progress Tasks</p> 
              <span className="analyticsTaskCount">{inProgressTasks}</span>
            </li>
            <li className="tasks">
              <p className="analyticsTask">Completed Tasks</p> 
              <span className="analyticsTaskCount">{completedTasks}</span>
            </li>
          </ul>
        </div>
        <div className="analyticsDiv">
          <ul className="taskslist">
            <li className="tasks">
              <p className="analyticsTask">Low Priority</p> 
              <span className="analyticsTaskCount">{lowPriorityTasks}</span>
            </li>
            <li className="tasks">
              <p className="analyticsTask">Moderate Priority</p> 
              <p className="analyticsTaskCount">{moderatePriorityTasks}</p>
            </li>
            <li className="tasks">
              <p className="analyticsTask">High Priority</p> 
              <p className="analyticsTaskCount">{highPriorityTasks}</p>
            </li>
            <li className="tasks">
              <p className="analyticsTask">Due Date Tasks</p> 
              <p className="analyticsTaskCount">{dueDateTasks}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
