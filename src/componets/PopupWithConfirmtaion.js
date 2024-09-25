import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popup, confirmFunction) {
    super(popup);
    this._confirmFunction = confirmFunction;
    this._confirmButton = this._popup.querySelector(".modal__submit");
    this._confirmButtonText = this._confirmButton.textContent;
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._confirmButton.textContent = loadingText;
    } else {
      this._confirmButton.textContent = this._confirmButtonText;
    }
  }

  handleButtonSaving() {
    this._confirmButton.textContent = "Deleting...";
  }

  resetConfirmButtonText() {
    this._confirmButton.textContent = this._confirmButtonText;
  }

  _runConfirmFunction() {
    this._confirmFunction(this._confirmInfo);
  }

  open(confirmInfo) {
    super.open();
    this._confirmInfo = confirmInfo;
  }

  close() {
    super.close();
    this._confirmInfo = "";
  }
  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this.renderLoading(true);
      this._runConfirmFunction();
    });
  }
}
