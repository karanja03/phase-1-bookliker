document.addEventListener("DOMContentLoaded", function() {
  fetch ('http://localhost:3000/books')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    const unorderedList=document.getElementById('list');
    //making each title clickable and diplaying them
    for(const book of data){
        
        const listEachBook=document.createElement('li');
         listEachBook.id='eachBookTitle';
         const link = document.createElement('a');
        link.href = `http://localhost:3000/books/${book.id}`;
        link.innerHTML = `<h3>${book.title}</h3>`;
         
        
         link.addEventListener('click', function() {
            event.preventDefault()

            handleClick(book.id);
        })
            listEachBook.append(link)
    unorderedList.appendChild(listEachBook)
      }  
})
 

 function handleClick(bookId){
    fetch(`http://localhost:3000/books/${bookId}`,{
        headers: {
            Accept: 'text/html',
          }, 
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(book) {
    
    const allInfo=document.getElementById('show-panel')
    allInfo.innerHTML = '';//clearing the info of the previous card called
    const card=document.createElement('div');
    card.className='infoCard';
    
        card.innerHTML=`
        <h2>Title: ${book.title}</h2>
        <h3>SubTitle: ${book.subtitle}</h3>
        <p>Brief Description: ${book.description}</p>
        <h4>Author: ${book.author}</h4>
        <img src="${book.img_url}" alt="Book Cover">
        <h4>Users:</h4>
        <ul>
        ${book.users.map(user => `<li>${user.username}</li>`).join('')}
         </ul>
         <button id=likesButton >LIKE BOOK</button>`

         allInfo.appendChild(card);
         
    

    })

    }
    //liking a book
    const likeButton = document.getElementById('likesbutton');
      likeButton.addEventListener('click', function() {
        handleLike(bookId, book);
      });
      function handleLike(bookId, book) {
        const currentUser = { id: 1, username: 'pouros' }; // Replace with actual user information
        const updatedUsers = [...book.users, currentUser];
      
        fetch(`http://localhost:3000/books/${bookId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ users: updatedUsers }),
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(updatedBook) {
            const usersList = document.querySelector('#show-panel ul');
            const newUserItem = document.createElement('li');
            newUserItem.textContent = currentUser.username;
            usersList.appendChild(newUserItem);
          });
      }


 }

)

