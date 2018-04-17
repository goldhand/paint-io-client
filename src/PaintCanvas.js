import DOMElement from './DOMElement';
import {className} from './PaintCanvas.css';

export default class PaintCanvas extends DOMElement {

  constructor(config) {
    super(config);
    this.state = {
      drawing: 0,
      color: '#ffffff',
      points: [],
    };
    this.onMoveListener = config.onMove;
    this.pen = this.elem.getContext('2d');
    this.sizeCanvas();
    this.registerMouse();
  }

  createElement() {
    const elem = document.createElement('canvas');
    elem.className = className;
    return elem;
  }

  setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }

  sizeCanvas = (height = window.innerHeight, width = window.innerWidth) => {
    this.elem.setAttribute('height', height);
    this.elem.setAttribute('width', width);
    this.setState({
      height,
      width,
    });
  }

  clear = () =>
    this.pen.clearRect(0, 0, this.state.width, this.state.height);

  changeColor = (color) =>
    this.setState({
      color,
    });

  drawLine = (points, color = this.state.color) => {
    if (points.length < 2) return; // cant draw with one point
    this.pen.beginPath();
    this.pen.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach(p => (this.pen.lineTo(p.x, p.y)));

    this.pen.lineCap = 'butt';
    this.pen.lineJoin = 'round';
    this.pen.meterLimit = 50;
    this.pen.lineWidth = 2;
    this.pen.strokeStyle = color;

    this.pen.stroke();
    this.pen.closePath();
  }

  onMouseMove = (e) => {
    if (!this.state.drawing) return;
    const point = {x: e.clientX, y: e.clientY};
    const points = this.state.points.slice(-1).concat(point);
    this.setState({points});
    this.drawLine(points);
    // notify the move listener
    if (this.onMoveListener) this.onMoveListener(this.state);
  }

  onMouseUp = () => {
    if (!this.state.drawing) return;
    this.setState({
      drawing: false,
      points: [],
    });
  }

  onMouseDown = (e) => {
    const point = {x: e.clientX, y: e.clientY};
    this.setState({
      drawing: true,
      points: [point],
    });
  }

  registerMouse = () => {
    this.elem.addEventListener('mousedown', this.onMouseDown, false);
    this.elem.addEventListener('mouseout', this.onMouseUp, false);
    this.elem.addEventListener('mouseup', this.onMouseUp, false);
    this.elem.addEventListener('mousemove', this.onMouseMove, false);
  }
}
