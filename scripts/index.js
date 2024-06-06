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

const cardImageModal = document.querySelector(".modal_modal-type_card-image");

function openModal(popup) {
  popup.classList.add("modal_opened");
}

function closeModal(popup) {
  popup.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardTemplate = document.querySelector("#cardTemplate").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardName = data.name;
  const cardImage = data.link;
  const cardImageDisplay = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__text").textContent = cardName;
  cardImageDisplay.src = cardImage;
  cardElement.querySelector(".card__image").alt = cardName;
  const cardHeart = cardElement.querySelector(".card__heart");
  cardHeart.addEventListener("click", (event) => {
    cardHeart.classList.toggle("card__heart_liked");
  });
  const cardDelete = cardElement.querySelector(".card__delete");
  cardDelete.addEventListener("click", (event) => {
    cardElement.remove();
  });

  const cardImageModalImage =
    cardImageModal.querySelector(".modal__card-image");
  const cardImageModalDescription = cardImageModal.querySelector(
    ".modal__card-image-description"
  );
  cardImageDisplay.addEventListener("click", (event) => {
    cardImageModalImage.src = cardImageDisplay.src;
    cardImageModalImage.alt = cardName;
    cardImageModalDescription.textContent = cardName;
    openModal(cardImageModal);
  });
  return cardElement;
}

const cardList = document.querySelector(".cards");

initialCards.forEach((item) => {
  cardList.append(getCardElement(item));
});

const profileEditModal = document.querySelector(
  ".modal_modal-type_profile-edit"
);
const profileModalName = profileEditModal.querySelector(".modal__input_name");
const profileModalDescription = profileEditModal.querySelector(
  ".modal__input_description"
);
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDecsription = profile.querySelector(".profile__description");
profile
  .querySelector(".profile__edit")
  .addEventListener("click", function (event) {
    openModal(profileEditModal);
    profileModalName.value = profileName.textContent;
    profileModalDescription.value = profileDecsription.textContent;
  });

const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
profileModalCloseButton.addEventListener("click", function (event) {
  closeModal(profileEditModal);
});

const profileForm = profileEditModal.querySelector(".modal__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitting!");
  profileName.textContent = profileModalName.value;
  profileDecsription.textContent = profileModalDescription.value;
  closeModal(profileEditModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

const cardAdderModal = document.querySelector(".modal_modal-type_card-adder");
const cardAdderModalTitle = cardAdderModal.querySelector(".modal__input_title");
const cardAdderModalLink = cardAdderModal.querySelector(
  ".modal__input_image-link"
);

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  openModal(cardAdderModal);
});

const cardAdderCloseButton = cardAdderModal.querySelector(".modal__close");
cardAdderCloseButton.addEventListener("click", (event) => {
  closeModal(cardAdderModal);
});

const cardAdderForm = cardAdderModal.querySelector(".modal__form");

function handleCardAdderFormSubmit(event) {
  event.preventDefault();
  console.log("Form Submitting!");
  const cardInfo = { name: "", link: "" };
  cardInfo.name = cardAdderModalTitle.value;
  cardInfo.link = cardAdderModalLink.value;
  const finalCard = getCardElement(cardInfo);
  cardList.prepend(finalCard);
  cardAdderModalTitle.value = "";
  cardAdderModalLink.value = "";
  closeModal(cardAdderModal);
}

cardAdderForm.addEventListener("submit", handleCardAdderFormSubmit);

cardImageModal
  .querySelector(".modal__close")
  .addEventListener("click", (event) => {
    closeModal(cardImageModal);
  });
