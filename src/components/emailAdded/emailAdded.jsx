import React from "react";
import "./emailAdded.css";
import CommonButton from "../commonButton/commonButton";

const EmailAdded = ({ email, setSuccessfullyEmailSend }) => {
  const handleCancel = () => {
    setSuccessfullyEmailSend(false);
  };
  return (
    <div className="emailAddedMainDiv">
      <div className="emailAddedDiv">
        <div className="emailAddedText">{email} added to board</div>
        <div className="parentSingleDiv">
          <div className="singleButton">
            <CommonButton
              textColor={"#fff"}
              buttonColor={"#17A2B8"}
              text={"Okay, got it!"}
              onClick={handleCancel}
              border={"none"}
              box-shadow={"0px 2px 12px 0px #82698C33"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAdded;
