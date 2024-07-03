import React, { useState } from "react";
import axios from "axios";
import "./settings.css";
import ProfileButton from "../../components/profileButtons/profileButtons";

const Settings = ({ globalUserName, globalEmail }) => {
  const [username, setUsername] = useState(globalUserName);
  const [email, setEmail] = useState(globalEmail);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleUpdate = async () => {
    try {
      const userToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      };

      const body = {
        username: username,
        email: email,
        oldPassword: oldPassword,
        password: newPassword,
      };

      console.log("Sending data:", body);

      const response = await axios.patch(
        "https://pro-manage-backend-83mj.onrender.com/user/updateUserDetails",
        body,
        config
      );

      if (response.status === 200) {
        window.location.reload();
        // Clear form or update state as needed
      }
    } catch (error) {
      console.error("Error updating user details", error);
      alert("Error updating user details: " + error.response.data.message);
    }
  };

  return (
    <div className="settingsMainDiv">
      <div className="settingsTitle">Settings</div>
      <div className="settingsPrimaryDiv">
        <div className="settingsAnalyticsDiv">
          <div className="nameAnalyticsDiv">
            <img
              src="assets/Profile.svg"
              alt="ProfileImg"
              className="profileAnalyticsImg"
            />
            <input
              type="text"
              placeholder="Name"
              className="nameAnalyticsText"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="emailAnalyticsDiv">
            <img
              src="assets/email.svg"
              alt="emailimg"
              className="emailAnalyticsImg"
            />
            <input
              type="email"
              placeholder="Update Email"
              className="emailAnalyticsText"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="oldpasswordDiv">
            <img src="assets/lock.svg" alt="lockimg" className="lockImg" />
            <div className="oldcommonPasswordDiv">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Old Password"
                className="oldpasswordText"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {confirmPasswordVisible ? (
                <img
                  src="assets/hide.png"
                  alt="openeye"
                  className="eyeImg"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{ width: "8%", height: "90%", cursor: "pointer" }}
                />
              ) : (
                <img
                  src="assets/eye.svg"
                  alt="eyeImg"
                  className="eyeImg"
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="newpasswordDiv">
            <img src="assets/lock.svg" alt="lockimg" className="lockImg" />
            <div className="newcommonPasswordDiv">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="New Password"
                className="newpasswordText"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {passwordVisible ? (
                <img
                  src="assets/hide.png"
                  alt="openeye"
                  className="eyeImg"
                  onClick={togglePasswordVisibility}
                  style={{ width: "8%", height: "90%", cursor: "pointer" }}
                />
              ) : (
                <img
                  src="assets/eye.svg"
                  alt="eyeImg"
                  className="eyeImg"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <ProfileButton
            textColor={"#fff"}
            buttonColor={"#17A2B8"}
            text={"Update"}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
