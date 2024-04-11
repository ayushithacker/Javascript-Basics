
import "../style/style.css";
import EditCard from "./EditCard.jsx";
import DeleteCard from "./DeleteCard";
import { useState } from 'react'



function BusinessCard({ cards, editCard, deleteCard }) {

  const [editCards,setEditCard]= useState(false)
const [deleteCards,setDeletecard] = useState(false)
const [id, setID] = useState(null)

const edit = (cardId)=>{
  setEditCard(true);
  setID(cardId)
}

const deleteeCards = (cardId)=>{
  setDeletecard(true)
  setID(cardId)
  console.log(cardId)
}

  return (
  
    <div>
  
      {cards.map(function (card) {
        return (
          <div className="main">
          <div className="container">

          <div key={card._id}>
            <h1>{card.name}</h1>
            <p>{card.description}</p>
            <h3>Interest</h3>

            <ul>
              {card.interest.map(function(interest){
                return <li>{interest}</li>
              })}
            </ul>
            
            <div className="social">
          
        <a href={card.linkedin}><button className="btn">linkedin</button></a>
   <a href={card.twitter}><button className="btn">Twitter</button></a>
        </div>

        <button onClick={() => deleteeCards(card._id)} >Delete
       
       {deleteCards && <DeleteCard  cardId={id}/>}
      
        </button>
        <button onClick={() => edit(card._id)}>Edit</button>
    
        {editCards && id == card._id ? <EditCard cardId = {id}/> : ""}
           </div> 
          </div>
          </div>
        )
      })}
    </div>
  
)}

export default BusinessCard

