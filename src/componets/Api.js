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

  createCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    );
  }

  addCardLike() {}

  removeCardLike() {}

  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
