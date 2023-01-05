const container = document.querySelector(".container");
const modalContainer = document.getElementById("modal-container");

async function getCharacters() {
  let characters = [];
  let nextUrl = "https://swapi.dev/api/people/";
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    characters = characters.concat(data.results);
    nextUrl = data.next;
  }
  return characters;
}

getCharacters().catch((error) => {
  console.log("error");
  console.error(error);
});

async function showCharacterDetails(characterUrl) {
  const response = await fetch(characterUrl);
  const data = await response.json();
//   console.log(data);
  // display the character details in the page
}

async function main() {
  const characters = await getCharacters();
  characters.forEach((character) => {
    // create a card for each character
      const card = document.createElement("div");
      const cardHeader = document.createElement("div");
      const cardBody = document.createElement("div");
      const cardUser = document.createElement("div");
      const profileImage = document.createElement("img");
      const cardInfo = document.createElement("div");
      const characterName = document.createElement("h5");
      const birthYear = document.createElement("small");
    // adding css classes
      card.classList.add('card');
      cardHeader.classList.add('card__header');
      cardBody.classList.add("card__body");
      cardUser.classList.add("user");
      cardInfo.classList.add("user__info");

    //   Attach values
      characterName.innerText = `${character.name}`;
      birthYear.innerText = `Born in: ${character.birth_year}`;
      

    profileImage.src = `https://ui-avatars.com/api/?name=${character.name}`;

    cardUser.addEventListener("click", (event) => {
      event.preventDefault();
      showCharacterDetails(character.url);
      showModal(character);
    });
    //   Append to the container

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
      cardBody.appendChild(cardUser);
      cardUser.appendChild(profileImage)
      cardUser.appendChild(cardInfo)
      cardInfo.appendChild(characterName)
      cardInfo.appendChild(birthYear)

    container.appendChild(card);
  });
}

main();

function showModal(character) {
  // create the modal elements
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const title = document.createElement("h2");
  title.innerText = character.name;

  const description = document.createElement("p");
  description.innerText = `Birth Year: ${character.birth_year} 
                           Created: ${character.created} 
                           Eye color: ${character.eye_color} 
                           Gender: ${character.gender} 
                           Hair color: ${character.hair_color} 
                           Height: ${character.height} 
                           Home world: ${character.homeworld}  
                           mass: ${character.mass} 
                           Skin color: ${character.skin_color} 
                           Species: ${character.species} 
                           Starships: ${character.starships} 
                           Url: ${character.url} 
                           Vehicles: ${character.vehicles} `;

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => {
    modalContainer.classList.remove("visible");
    modalContainer.innerHTML = "";
  });

  modal.appendChild(title);
  modal.appendChild(description);
  modal.appendChild(closeButton);

  modalContainer.appendChild(modal);

  modalContainer.classList.add("visible");
}
