import React, { useState } from 'react';
import OTP from './OTP';


const Number = () => {
  const [showOTP, setShowOTP] = useState(false);

  const handleClick = () => {
    setShowOTP(true);
  }

  return (
    <>
      {!showOTP && (
        <div>
          <input style={{padding: '20px'}} type="tel" placeholder="Enter Your Mobile Number" maxLength={10} />
        </div>
      )}

      {!showOTP && (
        <div>
          <button onClick={handleClick} style={{marginTop:"20px"}}>Send OTP</button>
        </div>
      )}

      {showOTP && <OTP />}
    </>
  );
}

export default Number;
