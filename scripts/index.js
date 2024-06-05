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

let cardImageModal = document.querySelector(".modal_modal-type_card-image");

function getCardElement(data) {
  let cardTemplate = document.querySelector("#cardTemplate").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  let cardName = data.name;
  let cardImage = data.link;
  cardElement.querySelector(".card__text").textContent = cardName;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardName;
  let cardHeart = cardElement.querySelector(".card__heart");
  cardHeart.addEventListener("click", (event) => {
    cardHeart.classList.toggle("card__heart_liked");
  });
  let cardDelete = cardElement.querySelector(".card__delete");
  cardDelete.addEventListener("click", (event) => {
    cardElement.remove();
  });
  let cardImageDisplay = cardElement.querySelector(".card__image");
  let cardImageModalImage = cardImageModal.querySelector(".modal__card-image");
  let cardImageModalDescription = cardImageModal.querySelector(
    ".modal__card-image-description"
  );
  cardImageDisplay.addEventListener("click", (event) => {
    cardImageModalImage.src = cardImageDisplay.src;
    cardImageModalDescription.textContent = cardName;
    cardImageModal.classList.add("modal_opened");
  });
  return cardElement;
}

let cardList = document.querySelector(".cards");

initialCards.forEach((item) => {
  cardList.append(getCardElement(item));
});

let profileEditModal = document.querySelector(".modal_modal-type_profile-edit");
let profileModalName = profileEditModal.querySelector(".modal__input_name");
let profileModalDescription = profileEditModal.querySelector(
  ".modal__input_description"
);
let profile = document.querySelector(".profile");
let profileName = profile.querySelector(".profile__name");
let profileDecsription = profile.querySelector(".profile__description");
profile
  .querySelector(".profile__edit")
  .addEventListener("click", function (event) {
    profileEditModal.classList.add("modal_opened");
    profileModalName.value = profileName.textContent;
    profileModalDescription.value = profileDecsription.textContent;
  });

let profileModalCloseButton = profileEditModal.querySelector(".modal__close");
profileModalCloseButton.addEventListener("click", function (event) {
  profileEditModal.classList.remove("modal_opened");
});

let profileForm = profileEditModal.querySelector(".modal__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitting!");
  profileName.textContent = profileModalName.value;
  profileDecsription.textContent = profileModalDescription.value;
  profileEditModal.classList.remove("modal_opened");
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

let cardAdderModal = document.querySelector(".modal_modal-type_card-adder");
let cardAdderModalTitle = cardAdderModal.querySelector(".modal__input_title");
let cardAdderModalLink = cardAdderModal.querySelector(
  ".modal__input_image-link"
);

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  cardAdderModal.classList.add("modal_opened");
});

let cardAdderCloseButton = cardAdderModal.querySelector(".modal__close");
cardAdderCloseButton.addEventListener("click", (event) => {
  cardAdderModal.classList.remove("modal_opened");
});

let cardAdderForm = cardAdderModal.querySelector(".modal__form");

function handleCardAdderFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitting!");
  let cardInfo = { name: "", link: "" };
  cardInfo.name = cardAdderModalTitle.value;
  cardInfo.link = cardAdderModalLink.value;
  let finalCard = getCardElement(cardInfo);
  cardList.prepend(finalCard);
  cardAdderModal.classList.remove("modal_opened");
}

cardAdderForm.addEventListener("submit", handleCardAdderFormSubmit);

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  cardAdderModal.classList.add("modal_opened");
});

cardImageModal
  .querySelector(".modal__close")
  .addEventListener("click", (event) => {
    cardImageModal.classList.remove("modal_opened");
  });
