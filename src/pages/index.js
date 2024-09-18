import { Card } from "../componets/Card.js";
import { FormValidator } from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithImage from "../componets/PopupWithImage.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import UserInfo from "../componets/UserInfo.js";
import { initialCards, formSettings } from "../utils/constants.js";
import "./index.css";

const cardImageModal = new PopupWithImage(
  document.querySelector(".modal_modal-type_card-image")
);
cardImageModal.setEventListeners();
const cardListLocation = document.querySelector(".cards");

function openCardModal(cardText, cardSrc) {
  cardImageModal.open(cardText, cardSrc);
}

function createCard(cardData) {
  const card = new Card(cardData, "cardTemplate", openCardModal);
  return card.generateCard();
}

function getInitialCards() {
  const cards = [];
  initialCards.forEach((item) => {
    const cardElement = createCard(item);
    cards.push(cardElement);
  });
  return cards;
}

function renderCards(element, elementList) {
  elementList.prepend(element);
}

const cardList = new Section(
  {
    items: getInitialCards(),
    renderer: renderCards,
  },
  cardListLocation
);
cardList.renderItems();

//////////////////// Profile Edit Form

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDecsription = profile.querySelector(".profile__description");

const profileInfo = new UserInfo({
  name: profileName,
  description: profileDecsription,
});

function handleProfileFormSubmit(inputValues) {
  profileInfo.setUserInfo(inputValues);
  profileEditModal.close();
}

const profileEditModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_profile-edit"),
  handleProfileFormSubmit
);

profileEditModal.setEventListeners();
const profileEditFormValidation = new FormValidator(
  formSettings,
  document.forms["profile-edit__form"]
);
profileEditFormValidation.enableValidation();

const profileModalName =
  profileEditModal._popup.querySelector(".modal__input_name");
const profileModalDescription = profileEditModal._popup.querySelector(
  ".modal__input_description"
);

profile
  .querySelector(".profile__edit")
  .addEventListener("click", function (event) {
    profileEditModal.open();
    const info = profileInfo.getUserInfo();
    profileModalName.value = info.name;
    profileModalDescription.value = info.description;
    profileEditFormValidation.resetValidation();
  });

///////////////////////// Card Adder Form
const cardAdderForm = document.querySelector("#add-card__form");
const cardAdderFormValidation = new FormValidator(formSettings, cardAdderForm);
cardAdderFormValidation.enableValidation();

function handleCardAdderFormSubmit(inputValues) {
  const newCard = createCard({
    text: inputValues.title,
    image: inputValues.link,
  });
  cardList.addItem(newCard);
  cardAdderModal.close();
  cardAdderFormValidation.resetValidation();
}

const cardAdderModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_card-adder"),
  handleCardAdderFormSubmit
);
cardAdderModal.setEventListeners();

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  cardAdderModal.open();
});
