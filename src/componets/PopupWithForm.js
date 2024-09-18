import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, submitFunction) {
    super(popup);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".modal__form");
  }
  _getInputValues() {
    this._inputValues = {};
    this._form.querySelectorAll(".modal__input").forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._getInputValues();
      evt.target.reset();
      this._submitFunction(this._inputValues);
    });
  }
}
