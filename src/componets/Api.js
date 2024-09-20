export default class Api {
  constructor({ token }) {
    this._token = token;
  }
  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: this._token,
      },
    });
  }
  updateUserInfo({ name, description }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    });
  }

  updateUserAvatar() {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: this._token,
      },
    });
  }

  createCard() {}

  deleteCard() {}

  addCardLike() {}

  removeCardLike() {}
}
