export default class Section {
  constructor({ items, renderer }, itemContainer) {
    this._initialItems = items;
    this._renderer = renderer;
    this._itemContainer = itemContainer;
  }

  setItems(items) {
    this._initialItems = items;
  }

  renderItems() {
    this._initialItems.forEach((item) => {
      this.addItem(item);
    });
  }
  addItem(element) {
    this._renderer(element, this._itemContainer);
  }
}
