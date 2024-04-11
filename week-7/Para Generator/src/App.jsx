import React, { useState } from 'react';

const App = () => {
  const [wordCount, setWordCount] = useState();
  const [paragraph, setParagraph] = useState('');

  const generateParagraph = () => {
    // You can replace this with your own paragraph generation logic
    const loremIpsum = 'Data Analysis requirement searching dev app 100xdev course purchase mern stack .';

    const words = loremIpsum.split(' ');
    const generatedParagraph = Array.from({ length: wordCount }, (_, index) => words[index % words.length]).join(' ');

    setParagraph(generatedParagraph);
  };

  return (
    <div >
      <div style={{display:'flex', justifyContent:'center'}}>
      <h1> Para Generator</h1>
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        
        <input
        style={{padding:'10px 20px', marginRight:'20px', width:'60%'}}
        placeholder='Enter Number of Words'
          type="number"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
        />
    
      <button onClick={generateParagraph} style={{borderRadius:'10px',padding:'5px 10px', backgroundColor:'black', color:'white'}}>Generate Paragraph</button>
      {paragraph && <p>{paragraph}</p>}
    </div>
    </div>
  );
};

export default App;
