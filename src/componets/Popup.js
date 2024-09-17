export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose = (evt) => {
    if (evt.key == "Escape") {
      this.close();
    }
  };
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (
        evt.target == this._popup.querySelector(".modal__close") ||
        evt.target == this._popup.querySelector(".modal__close-button-image")
      ) {
        this.close();
      }
    });
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
