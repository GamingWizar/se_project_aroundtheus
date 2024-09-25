import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popup, submitFunction) {
    super(popup);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__submit");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._form.querySelectorAll(".modal__input");
  }

  getForm() {
    return this._form;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
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
      this.renderLoading(true);
      this._submitFunction(this._getInputValues());
    });
  }
}
