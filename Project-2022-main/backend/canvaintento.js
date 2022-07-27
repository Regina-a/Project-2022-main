var canvas = document.getElementById('canvas');
var cC = canvas.getContext('2d');

var pressedQ = false; //trigger for write or not

var commands = [];

var commandTypes = {
  drawCircle: function (posX, posY, size, color) {
    cC.fillStyle = 'black';
    cC.beginPath();
    cC.arc(posX, posY, size, 0, Math.PI * 2, true);
    cC.fill();
  }
};

function execute() {
  var commandType = arguments[0];
  var data = Array.prototype.slice.call(arguments, 1);
  
  if (!commandTypes.hasOwnProperty(commandType))
    throw new Error(commandType + ' is not a real command');

  commandTypes[commandType].apply(null, data);
}

function pushAndExecute() {
  commands.push(arguments);
  execute.apply(null, arguments);
}

function getMousePosition(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  return {
    x: evt.offsetX - rect.left - root.scrollLeft,
    y: evt.offsetY - rect.top - root.scrollTop
  };
}

function pencil(evt) { 
  if (!pressedQ) return;
  var mousePos = getMousePosition(evt);
  pushAndExecute('drawCircle', mousePos.x, mousePos.y, 50);
}

function activate(evt) {
  pressedQ = true;
  // console.log('start');
  pencil(evt);
}

function deactivate() {
  pressedQ = false;
  // console.log('finish');
}

function handleKeys(evt) {
  if (evt.ctrlKey && evt.key === 'z') {
    // console.log('undo');

    // Remove the most recent command from the list
    commands.splice(-1, 1);

    // Clear canvas
    cC.clearRect(0, 0, canvas.width, canvas.height);

    // Re-play all commands (re-draw canvas from scratch)
    commands.forEach(function (command) {
      execute.apply(null, command);
    });
  }
}

window.onload = function() {
  cC.clearRect(0, 0, canvas.width, canvas.height);
  canvas.addEventListener('mousedown', activate);
  canvas.addEventListener('mousemove', pencil);
  canvas.addEventListener('mouseup', deactivate);
  window.addEventListener('keydown', handleKeys);
}