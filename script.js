const cardRow = document.querySelector(".card-row");
const cardOne = document.querySelectorAll(".cardOne");
const generateUserBtn = document.querySelector(".generateUserBtn button");

generateUserBtn.addEventListener("click", generateUsers);

async function generateUsers() {
  try {
    const response = await fetch("https://randomuser.me/api/?results=3");
    const data = await response.json();
    const users = data.results;

    cardRow.classList.add("hidden");
    cardOne.forEach(async (card, index) => {
      const user = users[index];
      const updatedCard = await createUserCard(user);
      card.innerHTML = updatedCard;
    });

    await delay(1000);

    cardRow.classList.remove("hidden");
  } catch (error) {
    console.log("Error:", error);
  }
}

async function createUserCard(user) {
  const { name, gender, location, nat, email, dob, picture } = user;

  return `
    <img src="${picture.large}" alt="">
    <h3>Name: ${name.first} ${name.last}</h3>
    <p>Gender: ${gender}</p>
    <p>Country: ${location.country}</p>
    <p>Nationality: ${nat}</p>
    <p>Email: <a href="#">${email}</a></p>
    <p>Date of Birth: ${dob.date.substring(0, 10)}</p>
  `;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

setInterval(function() {
  generateUsers();
}, 3000);