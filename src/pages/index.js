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
    .then((res) => {
      if (res.ok) {
        card.remove();
        return Promise.resolve();
      } else {
        return Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.error(`ERROR: Failed to delete card: ${err}`);
    });
}

function handleCardLike(isLiked, cardId) {
  if (isLiked) {
    return api.removeCardLike(cardId).then((res) => {
      if (res.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject(`Failed to remove like: ${res.status}`);
      }
    });
  } else {
    return api.addCardLike(cardId).then((res) => {
      if (res.ok) {
        return Promise.resolve();
      } else {
        return Promise.reject(`Failed to add like: ${res.status}`);
      }
    });
  }
}

function confirmCardDelete(card) {
  card.deleteCard().finally(() => {
    cardDeleteModal.close();
    cardDeleteModal.resetConfirmButtonText();
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
function setInitialUserInfo(res) {
  return res.then((json) => {
    profileInfo.setUserInfo({
      name: json.name,
      description: json.about,
    });
    profileInfo.setUserAvatar({ link: json.avatar });
  });
}

function setInitialCards(res) {
  return res.then((json) => {
    const cards = [];
    json.forEach((card) => {
      const cardElement = createCard(card);
      cards.unshift(cardElement);
    });
    cardList.setItems(cards);
    cardList.renderItems();
  });
}

const api = new Api({ token: token });
api
  .initialize()
  .then((resArr) => {
    if (resArr[0].ok && resArr[1].ok) {
      return (
        setInitialUserInfo(resArr[0].json()) + setInitialCards(resArr[1].json())
      );
    } else {
      return Promise.reject(
        `Failed to Initialize: User Info Status: ${resArr[0].status} Card List Status: ${resArr[1].status}`
      );
    }
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });

//////////////////// Profile Edit Form

function handleProfileFormSubmit(inputValues) {
  api
    .updateUserInfo(inputValues)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(
          `Error: ${res.status} Couldn't update profile info`
        );
      }
    })
    .then((res) => {
      profileInfo.setUserInfo({ name: res.name, description: res.about });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileEditModal.close();
      profileEditModal.resetSubmitButtonText();
    });
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

//////////////////////// Avatar Edit Form

function handleAvatarFormSubmit(inputValues) {
  api
    .updateUserAvatar(inputValues)
    .then((res) => {
      if (res.ok) {
        profileInfo.setUserAvatar(inputValues);
      } else {
        return Promise.reject(`Failed to update Avatar: ${res.status}`);
      }
    })
    .finally(() => {
      avatarEditModal.close();
      avatarEditModal.resetSubmitButtonText();
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
  document.forms["avatar-edit__form"]
);
avatarEditFormValidation.enableValidation();

profile.querySelector(".profile__avatar-edit").addEventListener("click", () => {
  avatarEditModal.open();
});

///////////////////////// Card Adder Form
const cardAdderForm = document.querySelector("#add-card__form");
const cardAdderFormValidation = new FormValidator(formSettings, cardAdderForm);
cardAdderFormValidation.enableValidation();

function handleCardAdderFormSubmit(inputValues) {
  api
    .createCard(inputValues)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    })
    .then((json) => {
      const newCard = createCard(json);
      cardList.addItem(newCard);
      cardAdderModal.close();
    })
    .catch((err) => {
      console.error(`ERROR: Failed to generate new card: ${err}`);
      cardAdderModal.close();
    })
    .finally(() => {
      cardAdderFormValidation.resetValidation();
      cardAdderModal.resetSubmitButtonText();
    });
}

const cardAdderModal = new PopupWithForm(
  document.querySelector(".modal_modal-type_card-adder"),
  handleCardAdderFormSubmit
);
cardAdderModal.setEventListeners();

profile.querySelector(".profile__add").addEventListener("click", (event) => {
  cardAdderModal.open();
});
