import React,{useState} from 'react';
import './addPeople.css';
import CommonButton from '../commonButton/commonButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPeople = ({setIsPeopleAdded,setEmail,setSuccessfullyEmailSend}) => {

  const [selectedEmail, setSelectedEmail] = useState('');
  const postAssignedUser = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('No token found in local storage');
      return;
    }
  
    const url = 'https://pro-manage-backend-83mj.onrender.com/user/assignedUser';
    const body = { email: selectedEmail };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
  
      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleCancel = () => {
    setIsPeopleAdded(false);
  };

  const handleAddEmail = () => {
    if (!selectedEmail) {
      toast.error('Please Enter User Email');
      return;
    }

    console.log(`Email added: ${selectedEmail}`);
    setEmail(selectedEmail);
    postAssignedUser();
    setIsPeopleAdded(false);
    setSuccessfullyEmailSend(true);
  };

  


  return (
    <div className='addPeopleMainDiv'>
        <div className="addPeopleDiv">
            <div className='addPeopleText'>Add people to the board</div>
            <div className="enterEmailDiv">
                <input type="email" placeholder='Enter the email' className='addPeopleEmail' value={selectedEmail} onChange={(e)=>{setSelectedEmail(e.target.value)}}/>
            </div>
            <div className="buttonGroup">
            <CommonButton textColor={'#CF3636'} buttonColor={'#fff'} text={'Cancel'} border={'1px solid #CF3636'} boxshadow={'none'} onClick={handleCancel}/>
            <CommonButton textColor={'#fff'} buttonColor={'#17A2B8'} text={'Add Email'} boxshadow={'0px 2px 12px 0px #82698C33'} border={'none'} onClick={handleAddEmail}/>
            </div>
        </div>
        <ToastContainer position='top-center'/>
    </div>
  )
}

export default AddPeople