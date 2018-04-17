import DOMElement from './DOMElement';
import {className} from './ColorSelector.css';

export default class ColorSelector extends DOMElement {

  constructor(config) {
    super(config)
    if (config.onChange) this.addEventListener('change', config.onChange);
  }

  createElement() {
    const elem = document.createElement('input');
    elem.setAttribute('type', 'color');
    elem.setAttribute('value', '#ffffff');
    elem.className = className;
    return elem;
  }
}
