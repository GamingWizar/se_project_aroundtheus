export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = name;
    this._description = description;
    this._avatar = avatar;
  }
  getUserInfo() {
    const info = {};
    info.name = this._name.textContent;
    info.description = this._description.textContent;
    return info;
  }
  setUserInfo({ name, description, avatar }) {
    this._name.textContent = name;
    this._description.textContent = description;
    if (!typeof avatar == undefined) {
      this._avatar.src = avatar;
    }
  }
}
