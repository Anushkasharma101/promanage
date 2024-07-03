import React, { useState } from "react";
import axios from "axios";
import ProfileButton from "../profileButtons/profileButtons";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = ({ setIsLoggedIn, setIsLogin,setLoading,notify}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const handleLogin = async () => {
    let valid = true;

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

    if (valid) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://pro-manage-backend-83mj.onrender.com/user/login",
          {
            email: email,
            password: password
          }
        );

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          toast.success("Login successful");
          
        } else {
          toast.error("error","Invalid Credentials");
          console.log("Login failed");

        }
      } catch (error) {
        notify("error",error.response.data.message || "An error occurred.");
      }finally{
        setLoading(false);
      }
    }
  };

  const handleRegisterRedirect = () => {
    setIsLogin(false);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="loginDiv">
      <div className="mainloginDiv">
        <div className="loginText">Login</div>
        <div className="emailDiv">
          <img
            src="assets/email.svg"
            alt="emailimg"
            className="emailImg"
          />
          <input
            type="email"
            placeholder={emailError ? "Please enter Email" : "Email"}
            className={`emailText ${emailError ? "inputError" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="passwordDiv">
          <img
            src="assets/lock.svg"
            alt="lockimg"
            className="lockImg"
          />
          <div className="commonPasswordDiv">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder={passwordError ? "Please enter Password" : "Password"}
              className={passwordError ? "inputError": "passwordText"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={passwordVisible ? "/assets/hide.png" : "/assets/eye.svg"}
              alt="eyeImg"
              className="eyeImg"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        <ProfileButton
          textColor={"#fff"}
          buttonColor={"#17A2B8"}
          text={"Log in"}
          onClick={handleLogin}
          
        />
        <p className="commonline">Have no account yet?</p>
        <ProfileButton
          textColor={"#17A2B8"}
          buttonColor={"#fff"}
          text={"Register"}
          onClick={handleRegisterRedirect}
        />
      </div>
    </div>
  );
};

export default Login;
