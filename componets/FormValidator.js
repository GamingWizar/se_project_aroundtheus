export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._settings.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._settings.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _showInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    this._errorElement.textContent = input.validationMessage;
    this._errorElement.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
  }
  _hideInputError(input) {
    this._errorElement = this._form.querySelector(`#${input.id}-error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._settings.errorClass);
    input.classList.remove(this._settings.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._checkInputValidity(input);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
