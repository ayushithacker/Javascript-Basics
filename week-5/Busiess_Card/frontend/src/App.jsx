import { useState } from 'react'
import './App.css'
import  BusinessCard  from './assets/component/BusinessCard'
import CreateBusinessCard from './assets/component/CreateBusinessCard'



function App() {
const [showComponents,setShowComponents] = useState(false)

const handleClick = ()=>{
  setShowComponents(true)
}



const [cards, setCards] = useState([])

fetch("http://localhost:3000/cards")
.then(async function (res){
  const data =  await res.json();
  setCards(data.cards)
})

  return (
    <>
      
      <button className='btn'>Show All Cards</button>
      <button className='btn' onClick={handleClick} >Generate Cards</button>
      {showComponents && <CreateBusinessCard/> }
   
    <BusinessCard cards={cards} />
    </>
  )
}

export default App
