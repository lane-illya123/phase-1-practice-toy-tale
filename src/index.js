//const { jQueryify } = require("jsdom");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function handleSubmit(e){
  e.preventDefualt()
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image_Url.value,
    likes:0
  }
}

function getToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      const toyCollectionDiv = document.querySelector('#toy-collection');

      data.forEach(toy => {
        // Create elements for each toy
        const toyCard = document.createElement('div');
        toyCard.className = 'card';

        const toyName = document.createElement('h2');
        toyName.textContent = toy.name;

        const toyImage = document.createElement('img');
        toyImage.src = toy.image;
        toyImage.className = 'toy-avatar';

        const toyLikes = document.createElement('p');
        toyLikes.textContent = `${toy.likes} Likes`;

        const likeButton = document.createElement('button');
        likeButton.className = 'like-btn';
        likeButton.textContent = 'Like';

        // Append elements to the toy card
        toyCard.appendChild(toyName);
        toyCard.appendChild(toyImage);
        toyCard.appendChild(toyLikes);
        toyCard.appendChild(likeButton);

        // Append the toy card to the toy collection div
        toyCollectionDiv.appendChild(toyCard);
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function addToys(toyObj){
// add a new toy to the collection
fetch('http://localhost:3000/toys',{
  method: 'POST' ,
  headers:{
      'Content-Type': "application/json"
  },
  body:JSON.stringify({
    "name": "Jessie",
    "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
    "likes": 0
  })
})
}

getToys();
