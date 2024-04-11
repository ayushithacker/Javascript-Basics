function DeleteCard({ cardId }) {
    const handleDelete = () => {

  
      // Perform the DELETE API call using fetch
      fetch(`http://localhost:3000/deleteCard/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed, such as authorization headers
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success (optional)
          console.log('Card deleted successfully');
        })
        .catch((error) => {
          // Handle error
          console.error('There was a problem deleting the card:', error.message);
        });
    };
  
    return (
      <div>
        <p>Are you sure you want to delete this card?</p>
        <button onClick={handleDelete}>Yes</button>
      </div>
    );
  }
 export default DeleteCard  