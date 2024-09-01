import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    // Function to calculate time remaining
    const calculateTimeRemaining = () => {
      let currentDate = new Date();

      // Get current time in Indian Standard Time (IST)
      let currentISTTime = new Date(
        currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
      );

      // Set the target time to 6:30 PM IST
      let targetISTTime = new Date(currentISTTime);
      targetISTTime.setHours(18, 30, 0, 0); // 18:30 is 6:30 PM in 24-hour format

      // If the current time is already past 6:30 PM, set the target to the next day
      if (currentISTTime > targetISTTime) {
        targetISTTime.setDate(targetISTTime.getDate() + 1);
      }

      // Calculate the time remaining in milliseconds
      let timeRemaining = targetISTTime - currentISTTime;

      // Convert milliseconds to a readable format (hours and minutes)
      let hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
      let minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

      setTimeRemaining(`${hoursRemaining} hours and ${minutesRemaining} minutes`);
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    const intervalId = setInterval(calculateTimeRemaining, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <div style={{ 
      height: "50%", 
      width: "50%", 
      backgroundColor: "black", 
      color: "white", 
      boxShadow: "0 15px 35px red", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center" 
    }}>
    <h1>Time remaining until 6:30 PM</h1>
    <p style={{height:"100px"}}>{timeRemaining}</p> 
  </div>
</div>

  );
};

export default Timer;
