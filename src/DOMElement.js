export default class DOMElement {

  constructor(config) {
    this.mountPoint = config.mountPoint;
    this.elem = this.createElement(config);
    // render if we can
    if (this.mountPoint && this.elem) this.render();
  }

  createElement() {
    // override when extending
    return document.createElement('div');
  }

  addEventListener = (event, listener) => {
    this.elem.addEventListener(event, listener);
    return () => this.elem.removeEventListener(event, listener);
  }

  get mountPoint() {
    if (
      this._mountPoint
      && DOMElement.isPrototypeOf(this._mountPoint.constructor)
    ) {
      return this._mountPoint.chain();
    }
    return this._mountPoint;
  }

  set mountPoint(mountPoint) {
    this._mountPoint = mountPoint;
  }

  render = (mountPoint) => {
    if (mountPoint) {
      // override existing mountpoint
      this.mountPoint = mountPoint;
    }
    this.mountPoint.appendChild(this.elem);
  }

  destroy = () => {
    this.mountPoint.removeChild(this.elem);
  }

  chain() {
    return this.elem;
  }
}
