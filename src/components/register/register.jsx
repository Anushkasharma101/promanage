import React, { useState } from "react";
import axios from "axios";
import ProfileButton from "../profileButtons/profileButtons";
import "./register.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Register = ({ setIsLoggedIn, setIsLogin,notify,setLoading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordMatch,setPasswordMatch] = useState(false);

  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegister = async () => {
    let valid = true;

    if (name === "") {
      setNameError(true);
      valid = false;
    } else {
      setNameError(false);
    }

    if (email === "") {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (password === "") {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (confirmPassword === "") {
      setConfirmPasswordError(true);
      valid = false;
    } else {
      setConfirmPasswordError(false);
    }

    if (password !== confirmPassword) {
      setPasswordMatch(true);
      valid = false;
      toast.error("Passwords do not match");
    } else {
      setPasswordMatch(false);
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await axios.patch(
          "https://pro-manage-backend-83mj.onrender.com/user/register",
          {
            username: name,
            email: email,
            password: password,
          }
        );

        if (response.status === 200) {
          const userToken = response.data.token;
          localStorage.setItem("token", userToken);
          setIsLoggedIn(true);
          toast.success("Registration Successful");
        } else {
          toast.error("error","Invalid Credentials");
        }
      } catch (error) {
        notify("error",error.response.data.message || "An error occurred.");
      }finally{
        setLoading(false);
      }
    }
  };

  const handleLoginRedirect = () => {
    setIsLogin(true);
  };

  return (
    <div className="registerDiv">
      <div className="mainRegisterDiv">
        <div className="registerText">Register</div>
        <div className="nameDiv">
          <img
            src="assets/Profile.svg"
            alt="ProfileImg"
            className="ProfileImg"
          />
          <input
            type="text"
            placeholder={nameError ? "Please enter Name" : "Name"}
            className={nameError ? "inputError" : "nameText"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="emailRegisterDiv">
          <img src="assets/email.svg" alt="emailimg" className="emailImg" />
          <input
            type="email"
            placeholder={emailError ? "Please enter Email" : "Email"}
            className={emailError ? "inputError" : "emailText"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="confirmpasswordRegisterDiv">
          <img src="assets/lock.svg" alt="lockimg" className="lockImg" />
          <div className="confirmcommonPasswordDiv">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder={confirmPasswordError ? "Please enter Confirm Password": "Confirm Password"}
              className={confirmPasswordError ? "inputError" : "confirmPasswordText"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordVisible ? (
              <img
                src="/assets/hide.png"
                alt="openeye"
                className="eyeImg"
                onClick={toggleConfirmPasswordVisibility}
                style={{ width: "8%", height: "90%", cursor: "pointer" }}
              />
            ) : (
              <img
                src="/assets/eye.svg"
                alt="eyeImg"
                className="eyeImg"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>
        </div>
        <div className="passwordRegisterDiv">
          <img src="assets/lock.svg" alt="lockimg" className="lockImg" />
          <div className="commonPasswordDiv">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={passwordError ? "Please enter Password" : "Password"}
              className={passwordError ? "inputError" : "passwordText"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          text={"Register"}
          onClick={handleRegister}
        />
        <p className="commonLineRegister">Have an account?</p>
        <ProfileButton
          textColor={"#17A2B8"}
          buttonColor={"#fff"}
          text={"Log in"}
          onClick={handleLoginRedirect}
        />
      </div>
    </div>
  );
};

export default Register;
