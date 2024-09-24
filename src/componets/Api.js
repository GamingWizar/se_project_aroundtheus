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

  updateUserAvatar({ link }) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }
    );
  }

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

  addCardLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      }
    );
  }

  removeCardLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    );
  }

  initialize() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
