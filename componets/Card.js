export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._text = data.text;
    this._image = data.image;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardTemplate() {
    const cardTemplate = document
      .querySelector("#cardTemplate")
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
    this._likeButtonHandler();
    this._deleteButtonHandler();
  }

  _likeButtonHandler() {
    this._cardHeart = this._element.querySelector(".card__heart");
    this._cardHeart.addEventListener("click", () => {
      this._cardHeart.classList.toggle("card__heart_liked");
    });
  }

  _deleteButtonHandler() {
    this._cardDelete = this._element.querySelector(".card__delete");
    this._cardDelete.addEventListener("click", () => {
      this._element.remove();
    });
  }

  generateCard() {
    this._element = this._getCardTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__text").textContent = this._text;
    this._element.querySelector(".card__image").src = this._image;
    this._element.querySelector(".card__image").alt = this._text;
    return this._element;
  }
}
