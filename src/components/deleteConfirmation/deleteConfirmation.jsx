import React from 'react'
import './deleteConfirmation.css'
import CommonButton from '../commonButton/commonButton'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteConfirmation = ({setIsDeleting,taskId,setShowDeleteToast}) => {
console.log('taskId',taskId);
console.log('token',localStorage.getItem('token'));
  const deleteTask = async () => {
    try {
      const response = await axios.delete(`https://pro-manage-backend-83mj.onrender.com/task/deleteTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      window.location.reload();
      console.log('Task deleted:', response.data);
      setShowDeleteToast(true);
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to Delete Task');
    }
  };
  return (
    <div className="deleteConfirmationMainDiv">
        <div className="deleteConfirmationDiv">
            <p className='deleteText'>Are you sure you want to Delete?</p>
            <div className="buttonView">
                <CommonButton textColor={'#fff'} buttonColor={'#17A2B8'} text={'Yes, Delete'} box-shadow={' 0px 2px 12px 0px #82698C33'} border={'none'} onClick={()=>{deleteTask(); setIsDeleting(false); }}/>
                <CommonButton textColor={'#CF3636'} buttonColor={'#fff'} text={'Cancel'} border={'1px solid #CF3636'} boxshadow={'none'} onClick={()=>{setIsDeleting(false)}}/>
            </div>
        </div>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default DeleteConfirmation