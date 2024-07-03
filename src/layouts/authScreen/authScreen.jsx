import React, { useState } from "react";
import "./authScreen.css";
import Login from "../../components/login/login";
import Register from "../../components/register/register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfinitySpin } from 'react-loader-spinner'


const AuthScreen = ({setIsLoggedIn}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); 

  const notify = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  return (
    <div className="parentDiv">
      <div className="leftDiv">
        <div className="logoimgDiv">
          <img
            src="assets/back_circle.svg"
            alt="circle"
            className="circleImg"
          />
          <img src="assets/logo.svg" alt="logoimg" className="logoImg" />
        </div>
        <div className="textline1">Welcome aboard my friend</div>
        <div className="textline2">just a couple of clicks and we start</div>
      </div>
      <div className="rightDiv">
      
          {isLogin ? (<Login setIsLoggedIn={setIsLoggedIn} setIsLogin={setIsLogin} notify={notify} setLoading={setLoading}/>) 
          :(<Register setIsLoggedIn={setIsLoggedIn} setIsLogin={setIsLogin} notify={notify} setLoading={setLoading}/>)}
          
      </div>
     <ToastContainer position="top-center" />
     {loading && (
      <div
      style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)", 
              zIndex: 1000, 
            }}
      >
      <InfinitySpin visible={true} width="200" color="#4fa94d" ariaLabel="infinity-spin-loading" />
      </div>
     )}
</div>
    
  );
};

export default AuthScreen;
