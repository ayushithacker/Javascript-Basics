import React, { useState, useEffect } from 'react';

function EditCard({ cardId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [interest, setInterest] = useState([]);
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  useEffect(() => {
    console.log(`Fetching data for cardId: ${cardId}`);

    // Fetch card data using API based on cardId when the component mounts
    // Adjust the API endpoint and headers as needed
    fetch(`http://localhost:3000/cards/${cardId}`)
      .then(response => response.json())
      .then(data => {
       
        setName(data.cards[0].name || '');
        setDescription(data.cards[0].description || '');
        setInterest(data.cards[0].interest || []);
        setLinkedin(data.cards[0].linkedin || '');
        setTwitter(data.cards[0].twitter || '');
      })
      .catch(error => console.error('Error fetching card data:', error));
  }, [cardId]);
  console.log(cardId)

  const handleUpdate = () => {
    // Perform the UPDATE API call using fetch
    fetch(`http://localhost:3000/updateCard/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        interest,
        linkedin,
        twitter,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success (optional)
        console.log('Card updated successfully');
      })
      .catch(error => {
        // Handle error
        console.error('There was a problem updating the card:', error.message);
      });
  };
   

  return (
    <div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
      </div>
     
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Interest:</label>
        <textarea value={interest.join(' ')} onChange={(e) => setInterest(e.target.value.split(/[,\s]+/))} />
      </div>
      <div>
        <label>Linkedin:</label>
        <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
      </div>
      <div>
        <label>Twitter:</label>
        <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
      </div>

      <p>Are you sure you want to update this card?</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditCard;
