export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }
  getUserInfo() {
    const info = {};
    info.name = this._name.textContent;
    info.description = this._description.textContent;
    return info;
  }
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
