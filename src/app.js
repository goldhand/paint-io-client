import Button from './Button';
import ColorSelector from './ColorSelector';
import PaintCanvas from './PaintCanvas';
import Message from './Message';
import Panel from './Panel';
import './app.css';
// TODO 1.1: import socket.io-client
import io from 'socket.io-client';
// TODO 1.2: create a new socket connection by invoking "socket.io-client". Convention is to name the returned socket instance "socket".
const socket = io();

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
 * @property {Function} write - update the message text
 */
const greet = new Message({
  text: 'Thank you for joining us!',
  prefix: '👋',
  mountPoint: statusPanel,
});
const targetAudience = new Message({
  text: 'All',
  prefix: '📢',
  mountPoint: statusPanel,
});

// TODO 2.1 (partial)
let username; // client username
// TODO 3.1 (partial)
let toUser; // pm paint

// initialize paint canvas
const paintCanvas = new PaintCanvas({
  mountPoint: document.body,
  onMove({points, color}) {
    // TODO 1.3: emit a "DRAW_POINTS" message to the server when paintCanvas has mouseMove events
    // socket.emit('DRAW_POINTS', {points, color});
    // TODO 3.1 (partial)
    socket.emit('DRAW_POINTS', {points, color, fromUser: username, toUser});
  },
});

// TODO 1.4: listen for draw events from the server of the draw action-type (eg "DRAW_LINE") and use the paintCanvas.drawLine(Array<{x: number, y: number}>, color: string) method to draw the points on the canvas.
// socket.on('DRAW_POINTS', ({points, color}) => {
//   paintCanvas.drawLine(points, color);
// });
// TODO 3.2 When a user is selected, filter draw events from other users (from 1.4) and only display events from the selected user.
socket.on('DRAW_POINTS', ({points, color, fromUser}) => {
  if (toUser === fromUser || !toUser) {
    paintCanvas.drawLine(points, color);
  }
});

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


// TODO 2.1: Emit "LOGIN" event to server
// TODO 2.2: Prevent users from using an existing username (multiple ways to do this, the most elegant would be using an "acknowledgement" when you dispatch the login event)
const login = () => {
  username = prompt('Enter your username');
  socket.emit('LOGIN', {username}, login);
};
socket.on('connect', () => {
  login();
  greet.write(`Hello, ${username}.`);
});

// TODO 2.3: Listen for an update user list event (eg "UPDATE_USER_LIST") from server, containing the "users" object with all usernames and update user list display. There's a "usersElem" variable that you can just set "innerHTML" value to display new users
// const createUserMessage = username => new Message({
//   text: username,
//   mountPoint: userPanel,
// });
// socket.on('UPDATE_USER_LIST', ({users}) => {
//   userPanel.clear();
//   Object.keys(users).map(createUserMessage);
// });
// TODO 3.1 Update the user list display from step 2.3 so that it displays buttons, when clicked, draw events will only be dispatched to that user.
const createUserBtn = username => new Button({
  text: username,
  variant: 'inverse',
  mountPoint: userPanel,
  onClick() {
    toUser = username;
    targetAudience.write(username);
  },
});
socket.on('UPDATE_USER_LIST', ({users}) => {
  userPanel.clear();
  createAllUserBtn();
  Object.keys(users).map(createUserBtn);
});

// TODO 3.3 create a button that, when clicked, will send draw events to all users again.
const createAllUserBtn = () => new Button({
  text: 'All',
  mountPoint: userPanel,
  onClick() {
    toUser = undefined;
    targetAudience.write('All');
  },
});
createAllUserBtn();
