import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, submitFunction) {
    super(popup);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__submit");
    this._submitButtonText = this._submitButton.textContent;
  }
  _getInputValues() {
    this._inputValues = {};
    this._form.querySelectorAll(".modal__input").forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
  }

  handleButtonSaving() {
    this._submitButton.textContent = "Saving...";
  }

  resetSubmitButtonText() {
    this._submitButton.textContent = this._submitButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleButtonSaving();
      this._getInputValues();
      evt.target.reset();
      this._submitFunction(this._inputValues);
    });
  }
}
