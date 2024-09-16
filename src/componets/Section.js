export default class Section {
  constructor({ items, renderer }, itemContainer) {
    this._initialItems = items;
    this._renderer = renderer;
    this._itemContainer = itemContainer;
  }

  renderItems() {
    this._initialItems.forEach((item) => {
      this._renderer(item, this._itemContainer);
    });
  }
  addItem(element) {
    this._renderer(element, this._itemContainer);
  }
}
