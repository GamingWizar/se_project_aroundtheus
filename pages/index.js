import { Card } from "../componets/Card.js";
import { FormValidator } from "../componets/FormValidator.js";

const initialCards = [
  {
    text: "Yosemite Valley",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    text: "Lake Louise",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    text: "Bald Mountains",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    text: "Latemar",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    text: "Vanoise National Park",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    text: "Lago di Braies",
    image:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardImageModal = document.querySelector(".modal_modal-type_card-image");

cardImageModal.addEventListener("mousedown", function (event) {
  if (event.target == cardImageModal) {
    closeModal(cardImageModal);
  }
});

function escModal(evt) {
  if (evt.key == "Escape") {
    const popup = document.querySelector(".modal_opened");
    closeModal(popup);
  }
}

function openModal(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", escModal);
}

function closeModal(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", escModal);
}

const cardList = document.querySelector(".cards");

function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, "cardTemplate", openCardImageModal);
    const cardElement = card.generateCard();
    cardList.append(cardElement);
  });
}
renderCards();

function openCardImageModal() {
  const cardImageModalImage =
    cardImageModal.querySelector(".modal__card-image");
  cardImageModalImage.src = this._image;
  cardImageModalImage.alt = this._image;
  cardImageModal.querySelector(".modal__card-image-description").textContent =
    this._text;
  openModal(cardImageModal);
}

cardImageModal
  .querySelector(".modal__close")
  .addEventListener("click", (event) => {
    closeModal(cardImageModal);
  });

//////////////////// Profile Edit Form
const profileEditForm = document.querySelector("#profile-edit__form");
const profileEditFormValidation = new FormValidator(
  formSettings,
  profileEditForm
);
profileEditFormValidation.enableValidation();

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileDecsription.textContent = profileModalDescription.value;
  closeModal(profileEditModal);
  profileEditFormValidation.resetValidation();
}
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

const profileEditModal = document.querySelector(
  ".modal_modal-type_profile-edit"
);

profileEditModal.addEventListener("mousedown", function (event) {
  if (event.target == profileEditModal) {
    closeModal(profileEditModal);
  }
});

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
    profileEditFormValidation.resetValidation();
  });

const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
profileModalCloseButton.addEventListener("click", function (event) {
  closeModal(profileEditModal);
});

///////////////////////// Card Adder Form
const cardAdderModal = document.querySelector(".modal_modal-type_card-adder");
const cardAdderModalTitle = cardAdderModal.querySelector(".modal__input_title");
const cardAdderModalLink = cardAdderModal.querySelector(
  ".modal__input_image-link"
);

const cardAdderForm = document.querySelector("#add-card__form");
const cardAdderFormValidation = new FormValidator(formSettings, cardAdderForm);
cardAdderFormValidation.enableValidation();

function handleCardAdderFormSubmit(event) {
  event.preventDefault();
  const cardInfo = { text: "", image: "" };
  cardInfo.text = cardAdderModalTitle.value;
  cardInfo.image = cardAdderModalLink.value;
  const newCard = new Card(cardInfo, "cardTemplate", openCardImageModal);
  const finalCard = newCard.generateCard();
  cardList.prepend(finalCard);
  event.target.reset();
  closeModal(cardAdderModal);
  cardAdderFormValidation.resetValidation();
}
cardAdderForm.addEventListener("submit", handleCardAdderFormSubmit);

cardAdderModal.addEventListener("mousedown", function (event) {
  if (event.target == cardAdderModal) {
    closeModal(cardAdderModal);
  }
});

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  openModal(cardAdderModal);
});

const cardAdderCloseButton = cardAdderModal.querySelector(".modal__close");
cardAdderCloseButton.addEventListener("click", (event) => {
  closeModal(cardAdderModal);
});
