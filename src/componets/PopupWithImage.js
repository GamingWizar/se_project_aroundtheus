import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(imgText, imgSrc) {
    this._cardImage = this._popup.querySelector(".modal__card-image");
    this._cardImage.src = imgSrc;
    this._cardImage.alt = imgText;
    this._popup.querySelector(".modal__card-image-description").textContent =
      imgText;
    super.open();
  }
}
