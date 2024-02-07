let initialCards = [
  (card0 = {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  }),
  (card1 = {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  }),
  (card2 = {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  }),
  (card3 = {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  }),
  (card4 = {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  }),
  (card5 = {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  }),
];

function getCardElement(data) {
  let cardTemplate = document.querySelector("#cardTemplate").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardName = data.name;
  let cardImage = data.link;
  cardElement.querySelector(".card__text").textContent = cardName;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardName;
  return cardElement;
}

let cardList = document.querySelector(".cards");

for (let i = 0; i < initialCards.length; i++) {
  cardList.append(getCardElement(initialCards[i]));
}

let modal = document.querySelector(".modal");
let modalName = modal.querySelector(".modal__input_name");
let modalDescription = modal.querySelector(".modal__input_description");
let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDecsription = profile.querySelector(".profile__description");
profile
  .querySelector(".profile__edit")
  .addEventListener("click", function (event) {
    modal.classList.add("modal_opened");
    modalName.value = profileName.textContent;
    modalDescription.value = profileDecsription.textContent;
  });

let modalCloseButton = modal.querySelector(".modal__close");
modalCloseButton.addEventListener("click", function (event) {
  modal.classList.remove("modal_opened");
});

let profileForm = modal.querySelector(".modal__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitting!");
  profileName.textContent = modalName.value;
  profileDecsription.textContent = modalDescription.value;
  modal.classList.remove("modal_opened");
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
