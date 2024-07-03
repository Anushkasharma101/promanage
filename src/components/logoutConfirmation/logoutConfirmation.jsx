import React from 'react'
import './logoutConfirmation.css'
import CommonButton from '../commonButton/commonButton'

const LogoutConfirmation = ({setIsLoggedIn,setIsLoggingOut}) => {
  return (
    <div className='logoutMainDiv'>
        <div className="logoutDiv">
            <div className='logoutText'>Are you sure you want to Logout?</div>
            <div className="buttonViewGroup">
                <CommonButton textColor={'#fff'} buttonColor={'#17A2B8'} text={'Yes, Logout'} box-shadow={' 0px 2px 12px 0px #82698C33'} border={'none'} onClick={()=>{localStorage.removeItem('token'); setIsLoggedIn(false); setIsLoggingOut(false)}}/>
                <CommonButton textColor={'#CF3636'} buttonColor={'#fff'} text={'Cancel'} border={'1px solid #CF3636'} boxshadow={'none'} onClick={()=>{setIsLoggingOut(false)}}/>
            </div>
        </div>
    </div>
  )
}

export default LogoutConfirmation