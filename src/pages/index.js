import { Card } from "../componets/Card.js";
import { FormValidator } from "../componets/FormValidator.js";
import Section from "../componets/Section.js";
import PopupWithImage from "../componets/PopupWithImage.js";
import PopupWithForm from "../componets/PopupWithForm.js";
import PopupWithConfirmation from "../componets/PopupWithConfirmtaion.js";
import UserInfo from "../componets/UserInfo.js";
import { formSettings, token } from "../utils/constants.js";
import "./index.css";
import Api from "../componets/Api.js";

// Profile consts
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDecsription = profile.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__avatar");

const profileInfo = new UserInfo({
  name: profileName,
  description: profileDecsription,
  avatar: profileAvatar,
});

// Cards and Cardlist
const cardListLocation = document.querySelector(".cards");

function deleteCard(cardId, card) {
  return api
    .deleteCard(cardId)
    .then(() => {
      card.remove();
      cardDeleteModal.close();
    })
    .catch((err) => {
      console.error(`ERROR: Failed to delete card: ${err}`);
    });
}

function handleCardLike(isLiked, cardId) {
  if (isLiked) {
    return api.removeCardLike(cardId).catch((err) => {
      return Promise.reject(`Failed to remove like: ${err}`);
    });
  } else {
    return api.addCardLike(cardId).catch((err) => {
      return Promise.reject(`Failed to add like: ${err}`);
    });
  }
}

function confirmCardDelete(card) {
  card.deleteCard().finally(() => {
    cardDeleteModal.renderLoading(false);
  });
}

const cardDeleteModal = new PopupWithConfirmation(
  document.querySelector(".modal_modal-type_confirm-delete"),
  confirmCardDelete
);
cardDeleteModal.setEventListeners();

const cardImageModal = new PopupWithImage(
  document.querySelector(".modal_modal-type_card-image")
);
cardImageModal.setEventListeners();

function openCardModal(cardText, cardSrc) {
  cardImageModal.open(cardText, cardSrc);
}

function opencardDeleteModal(card) {
  cardDeleteModal.open(card);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "cardTemplate",
    openCardModal,
    opencardDeleteModal,
    deleteCard,
    handleCardLike
  );
  return card.generateCard();
}

function renderCards(element, elementList) {
  elementList.prepend(element);
}

const cardList = new Section(
  {
    items: [],
    renderer: renderCards,
  },
  cardListLocation
);

// API
function setInitialUserInfo(json) {
  profileInfo.setUserInfo({
    name: json.name,
    description: json.about,
  });
  profileInfo.setUserAvatar({ link: json.avatar });
}

function setInitialCards(json) {
  const cards = [];
  json.forEach((card) => {
    const cardElement = createCard(card);
    cards.unshift(cardElement);
  });
  cardList.setItems(cards);
  cardList.renderItems();
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
api
  .initialize()
  .then((resArr) => {
    return setInitialUserInfo(resArr[0]) + setInitialCards(resArr[1]);
  })
  .catch((err) => {
    console.error(
      `ERROR: Failed to Initialize: User Info Status: ${err[0]} Card List Status: ${err[1]}`
    );
  });

//////////////////// Profile Edit Form

function handleProfileFormSubmit(inputValues) {
  api
    .updateUserInfo(inputValues)
    .then((res) => {
      profileInfo.setUserInfo({ name: res.name, description: res.about });
      profileEditModal.close();
      profileEditModal.setInputValues({ name: "", description: "" });
    })
    .catch((err) => {
      console.error(`Error: ${err} Couldn't update profile info`);
    })
    .finally(() => {
      profileEditModal.renderLoading(false);
    });
}

const profileEditModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_profile-edit"),
  handleProfileFormSubmit
);
profileEditModal.setEventListeners();

const profileEditFormValidation = new FormValidator(
  formSettings,
  profileEditModal.getForm()
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
    const info = profileInfo.getUserInfo();
    profileEditModal.setInputValues({
      name: info.name,
      description: info.description,
    });
    profileEditFormValidation.resetValidation();
    profileEditModal.open();
  });

//////////////////////// Avatar Edit Form

function handleAvatarFormSubmit(inputValues) {
  api
    .updateUserAvatar(inputValues)
    .then(() => {
      profileInfo.setUserAvatar(inputValues);
      avatarEditModal.close();
      avatarEditModal.setInputValues({ link: "" });
    })
    .catch((err) => {
      console.error(`ERROR: Failed to update Avatar: ${err}`);
    })
    .finally(() => {
      avatarEditModal.renderLoading(false);
      avatarEditFormValidation.resetValidation();
    });
}

const avatarEditModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_avatar-edit"),
  handleAvatarFormSubmit
);
avatarEditModal.setEventListeners();

const avatarEditFormValidation = new FormValidator(
  formSettings,
  avatarEditModal.getForm()
);
avatarEditFormValidation.enableValidation();

profile.querySelector(".profile__avatar-edit").addEventListener("click", () => {
  avatarEditModal.open();
});

///////////////////////// Card Adder Form
function handleCardAdderFormSubmit(inputValues) {
  api
    .createCard(inputValues)
    .then((json) => {
      const newCard = createCard(json);
      cardList.addItem(newCard);
      cardAdderModal.close();
      cardAdderModal.setInputValues({ name: "", link: "" });
      cardAdderFormValidation.resetValidation();
    })
    .catch((err) => {
      console.error(`ERROR: Failed to generate new card: ${err}`);
    })
    .finally(() => {
      cardAdderModal.renderLoading(false);
    });
}

const cardAdderModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_card-adder"),
  handleCardAdderFormSubmit
);
cardAdderModal.setEventListeners();

const cardAdderFormValidation = new FormValidator(
  formSettings,
  cardAdderModal.getForm()
);
cardAdderFormValidation.enableValidation();

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  cardAdderModal.open();
});
