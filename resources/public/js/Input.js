// handles all user inputs
window.addEventListener('keydown', function (event) {
  switch (event.keyCode) {
    case 37: ws.send('left'); break;
    case 38: ws.send('up'); break;
    case 39: ws.send('right'); break;
    case 40: ws.send('down'); break;
    case 32: ws.send('bomb'); break; // space
    // case 68: debugger; break;
  }
});

