import React, { useState, useRef } from 'react';
import '/src/App.css'

const OTP = () => {
  const [otp, setOTP] = useState(['', '', '', '']); // Array to store each digit
  const [showNumber, setShowNumber] = useState(true);
  const otpInputsRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move to the next input when a digit is entered
    if (index < otp.length - 1 && value !== '') {
      otpInputsRef[index + 1].current.focus();
    }
    else if (index > 0 && value === '') {
        otpInputsRef[index - 1].current.focus();
      }

  };

  return (
    <>
      {showNumber && (
        <div className='container'>
          {otp.map((digit, index) => (
            <input
            className='box'
              key={index}
              type="tel"
              placeholder="_"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              ref={otpInputsRef[index]}
            />
          ))}
        </div>
        
      )}

      {!showNumber && <OTP />}
      <div style={{display:"flex", justifyContent:"center"}}>
        <button className='login'>Login</button>
      </div>
    </>
  );
};

export default OTP;
