import DOMElement from './DOMElement';
import style from './Message.css';

export default class Message extends DOMElement {

  constructor(config) {
    super(config)
    this.prefix = config.prefix;
    if (config.text) this.write(config.text);
  }

  createElement() {
    const elem = document.createElement('p');
    elem.className = style.className;
    return elem;
  }

  write = text => {
    if (this.prefix) {
      this.elem.innerHTML = `<span class="${style.prefix}">${this.prefix}</span> ${text}`;
    } else {
      this.elem.innerText = text;
    }
  }

  read = () => this.elem.textContent;
}
