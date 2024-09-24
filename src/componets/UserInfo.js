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
  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
  setUserAvatar({ link }) {
    this._avatar.src = link;
  }
}
