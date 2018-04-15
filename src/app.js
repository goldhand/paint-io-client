import io from 'socket.io-client';
import Button from './Button';
import ColorSelector from './ColorSelector';
import PaintCanvas from './PaintCanvas';
import Message from './Message';
import Panel from './Panel';
import './app.css';



// these are mounted to the document.body unless otherwise specified.
// <body>
//   <div id="paint-container"></div>
const createLayoutPanel = position =>
  new Panel({mountPoint: document.body, position});
const statusPanel = createLayoutPanel('topLeft');
const userPanel = createLayoutPanel('topRight');
const controlPanel = createLayoutPanel('bottomLeft');
