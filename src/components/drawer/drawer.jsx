import React, { useState } from "react";
import "./drawer.css";
import { NavLink, useLocation } from "react-router-dom";


const Drawer = ({ setIsLoggingOut }) => {
  const [analyticsKey, setAnalyticsKey] = useState(0);
  
  const location  = useLocation();
  const handleAnalyticsClick = () => {
    if (location.pathname === "/analytics") {
      setAnalyticsKey(analyticsKey + 1);
    }
  };

  return (
    <div className="sideDrawer">
      <div className="sideDrawerUpper">
        <div className="proManage">
          <div className="proManageCenterDiv">
            <img
              src="assets/codesandbox.svg"
              alt="codesandboxImg"
              className="codesandboxImg"
            />

            <div className="title">Pro Manage</div>
          </div>
        </div>
        <NavLink to="/dashboard" className="navLink">
          <div className="boardDiv">
            <div className="boardCenterDiv">
              <img
                src="assets/layout.svg"
                alt="layoutImg"
                className="layoutImg"
              />
              <div className="board">Board</div>
            </div>
          </div>
        </NavLink>
        <NavLink to="/analytics" className="navLink" onClick={handleAnalyticsClick}>
          <div className="analyticsDrawerDiv">
            <div className="analyticsCenterDiv">
              <img
                src="assets/database.svg"
                alt="databaseImg"
                className="databaseImg"
              />
              <div className="analytics">Analytics</div>
            </div>
          </div>
        </NavLink>
        <NavLink to="/settings" className="navLink" >
          <div className="settingsDiv">
            <div className="settingsCenterDiv">
              <img
                src="assets/settings.svg"
                alt="settingsImg"
                className="settingsImg"
              />
              <div className="settings">Settings</div>
            </div>
          </div>
        </NavLink>
      </div>
      <div className="sideDrawerLower">
        <div
          className="logoutButtonDiv"
          onClick={() => {
            setIsLoggingOut(true);
          }}
        >
          <img src="assets/Logout.svg" alt="logOutImg" className="logoutImg" />
          <div className="logoutBtn">Log out</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
