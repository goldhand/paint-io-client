import Button from './Button';
import ColorSelector from './ColorSelector';
import PaintCanvas from './PaintCanvas';
import Message from './Message';
import Panel from './Panel';
import './app.css';
// TODO 1.1: import socket.io-client
// TODO 1.2: create a new socket connection by invoking "socket.io-client". Convention is to name the returned socket instance "socket".

/**
 * Creates a layout panel in a specified position. Other components can use
 * these as `mountPoint`s.
 * @param {'topLeft'|'topRight'|'bottomLeft'|'bottomRight'} [position] If
 *        specified, will position the element in that corner of the viewport.
 * @return {Panel} A Panel instance
 */
const createLayoutPanel = position =>
  new Panel({mountPoint: document.body, position});
const statusPanel = createLayoutPanel('topLeft'); // messages for users
const userPanel = createLayoutPanel('topRight'); // actions to interact with other users
const controlPanel = createLayoutPanel('bottomLeft'); // actions on the paint canvas

/**
 * Displays a status message
 *
 * @example Updating the status message
 * greet.write('my new message');
 *
 * @type {Message}
 * @property {Function} write update the message text
 */
const greet = new Message({
  text: 'Thank you for joining us!',
  prefix: '👋',
  mountPoint: statusPanel,
});

let username; // client username

// initialize paint canvas
const paintCanvas = new PaintCanvas({
  mountPoint: document.body,
  onMove({points, color}) {
    // TODO 1.3: emit a "DRAW_POINTS" message to the server when paintCanvas has mouseMove events
  },
});

// TODO 1.4: listen for draw events from the server of the draw action-type (eg "DRAW_POINTS") and use the paintCanvas.drawLine(Array<{x: number, y: number}>, color: string) method to draw the points on the canvas.

// create and render the color selector
new ColorSelector({
  mountPoint: controlPanel,
  onChange(e) {
    paintCanvas.changeColor(e.target.value);
  },
});
// create and render the clear button
new Button({
  text: 'Clear',
  variant: 'accent',
  mountPoint: controlPanel,
  onClick() {
    paintCanvas.clear();
  },
});

setTimeout(() => {
  // next tick
  username = prompt('Enter your username');
  greet.write(`Hello, ${username}.`);
});
// TODO 2.1: Emit a login event (eg "LOGIN") to the server when the client is connected with the selected username.
// TODO 2.2: Prevent users from using an existing username (multiple ways to do this, the most elegant would be using an "acknowledgement" when you dispatch the login event)
// TODO 2.3: Listen for an update user list event (eg "UPDATE_USER_LIST") from server, containing the "users" object with all usernames then update the dom to display this.

// TODO 3.1 Update the user list display from step 2.3 so that it displays buttons, when clicked, draw events will only be dispatched to that user. You will also need to modify the onMove handler from 1.3
// TODO 3.2 When a user is selected, filter draw events from other users and only display events from the selected user. You will likely need to update the "DRAW_POINTS" listener from 1.4
// TODO 3.3 Create a button that, when clicked, will send draw events to all users again.
