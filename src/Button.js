import DOMElement from './DOMElement';
import style from './Button.css';

export default class Button extends DOMElement {

  constructor(config) {
    super(config)
    if (config.onClick) this.addEventListener('click', config.onClick);
  }

  createElement({text, data = {}, variant}) {
    const elem = document.createElement('button');
    elem.innerText = text;
    elem.className = style.className;
    if (variant && style[variant]) {
      elem.classList.add(style[variant]);
    }
    for (const field in data) {
      elem.dataset[field] = data[field];
    }
    return elem;
  }

  select = () => {
    this.elem.classList.add('active');
  }

  unselect = () => {
    this.elem.classList.remove('active');
  }

}
