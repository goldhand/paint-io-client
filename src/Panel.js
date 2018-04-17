import DOMElement from './DOMElement';
import style from './Panel.css';

export default class Panel extends DOMElement {

  createElement({position}) {
    const elem = document.createElement('div');
    if (position && style[position]) {
      elem.classList.add(style.position, style[position]);
    }
    return elem;
  }

  clear = () => {
    this.elem.innerHTML = '';
  }
}
