// ColorChanger.js

import React, { useState ,useEffect} from 'react';

const App = () => {
  const [color, setColor] = useState('');


  useEffect(() => {
    // Change body background color when color state changes
    document.body.style.backgroundColor = color;
  }, [color]);
  const changeColor = (e) => {

    const text = e.target.textContent
    console.log(text)
    setColor(text);
    document.body.style.backgroundColor = color

  };

  return (
      
    <>
    
    <div style={{display:'flex',alignItems:'flex-end',justifyContent:'center', minHeight:'80vh'} }> 
      <div className="buttons" > 
      <button style={{color:'black', borderRadius:'7px',padding:'5px 20px' ,backgroundColor:'red'}} onClick={changeColor}>red</button>
      <button style={{color:'black', borderRadius:'7px',padding:'5px 20px' ,backgroundColor:'yellow'}} onClick={changeColor}>yellow</button>
      <button style={{color:'white', borderRadius:'7px',padding:'5px 20px' ,backgroundColor:'black'}} onClick={changeColor}>black</button>
      <button style={{color:'black', borderRadius:'7px',padding:'5px 20px' ,backgroundColor: 'orange'}} onClick={changeColor}>orange</button>
      <button style={{color:'black', borderRadius:'7px',padding:'5px 20px' ,backgroundColor:'purple'}} onClick={changeColor}>purple</button>
      <button style={{color:'black', borderRadius:'7px',padding:'5px 20px' ,backgroundColor:'green'}} onClick={changeColor}>green</button>

      </div>
    </div>
    </>
  );
};

export default App;
