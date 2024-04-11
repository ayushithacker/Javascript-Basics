import React, { useState } from 'react'

const CreateBusinessCard = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [interest, setinterest] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')
  return (
    <>
    <div>
      <h1>Create Your e-Business Card !!</h1>
      <div>      
        <input style= {{padding:10,margin:10}} type="text" placeholder='Enter Your Name' 
        
        onChange={function(e){
            const value = e.target.value;
            setName(e.target.value)
            
        }}/>
      </div>
      <div>
      <input style= {{padding:10,margin:10}} type="text" placeholder='Enter Your Description'
      onChange={function(e){
        const value = e.target.value;
        setDescription(e.target.value)
        
    }}/>

      </div>
      <div>
      <textarea style= {{padding:10,margin:10}} placeholder='Enter Your Interest'
      onChange={function(e){
        const value = e.target.value;
      
        setinterest(e.target.value)
        
    }}/>

      </div>
      <div>
      <input style= {{padding:10,margin:10}} type="text" placeholder='Enter Your Linkedin link'
      onChange={function(e){
        const value = e.target.value;
        
        setLinkedin(e.target.value)
        
    }}/>

      </div>
      <div>
      <input style= {{padding:10,margin:10}} type="text" placeholder='Enter Your Twitter Link'
      onChange={function(e){
        const value = e.target.value;
        setTwitter(e.target.value)
        
    }}/>

      </div>
      <div>
        <button style= {{padding:10,margin:10}}
        onClick={async (e)=>{
          var wordsArray = interest.split(/[,\s]+/)
        
          
            await fetch("http://localhost:3000/createCards",{
            method : "POST",
            body : JSON.stringify({
                name : name,
                description: description,
                interest : wordsArray,
                linkedin : linkedin,
                twitter: twitter

            }),
            headers:{
                "content-Type" : "application/json"
            }
        })
     
        .then(async function(res){
            const json = await res.json();
            alert("Card added")
        })
        
        }}>Generate Card</button>
      </div>
    </div>
    </>
  )
}

export default CreateBusinessCard