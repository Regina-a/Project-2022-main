// encuentra lienzo
var canvas = document.getElementById('canvas');
//"cC" entiende a canvas por .getContext
var cC = canvas.getContext('2d');
//evalua si alguien dibuja o no
var pressedQ = false; 
var commands = [];
// herramientas predeterminadas
let  color= 'black', grosor='1';

// "c" es guardar color del usuario en hex
function defcolor(c){
color = c;
cC.globalCompositeOperation = 'source-over' //color lo agarra y dibuja
}

// "g" es el grosor que le pone el usuario
function defgrosor(g) {
  grosor = g;
}

// objeto con argumentos
var commandTypes = {
  drawCircle: function (posX, posY ) {//coordenadas
    cC.beginPath();//inicia el trazo
    cC.fillStyle = color; //indica el color del puntero
    cC.lineWidth= grosor// define el grosor
    
    cC.arc(posX, posY, cC.lineWidth ,0, Math.PI * 2);//indica coordenadas, grosor y puntero en circle
    console.log(cC.arc);

    cC.fill();//rellena de color el camino del puntero despues de que se le asigen el color con .fillstyel y ser activado con .beginPath
  }
};

function execute() {
  var commandType = arguments[0];
  console.log(arguments[0]);
  console.log(commandType);
  var data = Array.prototype.slice.call(arguments, 1);  //guarda la info de argumentos

  //por si hay fallos
  if (!commandTypes.hasOwnProperty(commandType))
    throw new Error(commandType + ' is not a real command');

  commandTypes[commandType].apply(null, data);
}

//info de argumentos en array commands
function pushAndExecute() {
  commands.push(arguments);
  execute.apply(null, arguments);
}

//coordenadas usuario
function getMousePosition( evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have been activated
    y: (evt.clientY - rect.top) * scaleY  
    };
}

//puntero, asigna caracteristicas al puntero
function pencil(evt) {
  if (!pressedQ) return;
  var mousePos = getMousePosition(evt);
  pushAndExecute('drawCircle', mousePos.x, mousePos.y, 50);
}

//indica que el puntero esta hacendo click sobre el canvas y acciona el puntero
function activate(evt) {
  pressedQ = true; //se cambia a q alguien esta sobre el lienzo
  pencil(evt); //activa la funcion del puntero
}

//Indica que el puntero no esta activado (haciendo click) en el canvas
function deactivate() {
  pressedQ = false;
}

//evento para ctrl z
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
function erase(){
  cC.globalCompositeOperation = 'destination-out'
 // erase=true
}

window.onload = function () { //
  cC.clearRect(0, 0, canvas.width, canvas.height); //limpia el cC
  canvas.addEventListener('mousedown', activate); //traza
  canvas.addEventListener('mousemove', pencil); //mueve
  canvas.addEventListener('mouseup', deactivate); //deja de trazar
  window.addEventListener('keydown', handleKeys); //ctrl z se activa en ventana
}

function convertCanvasToImage() {
    alert('Your drawing has been uploaded to the gallery!')
    console.log('hola');
    let canvas = document.getElementById("canvas");
  //  let image = document.getElementById('img');
    console.log(typeof canvas.toDataURL());
    let autorRecibido = localStorage.getItem("autor")//info del localStorage
    let descRecibida = localStorage.getItem("descripcion");
    //image.src = canvas.toDataURL();
    fetch('http://localhost:3000/guardarIMG', {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: "POST",
        body:JSON.stringify({"img": canvas.toDataURL(), "nombre": autorRecibido, "descripcion": descRecibida})
       
    })
    //image.classList.add("canva")
    saveDynamicDataToFile()
  }
  

// saveDynamicDataToFile()
let miarray = [];// arreglo
 function saveDynamicDataToFile() {

    let userInput = document.getElementById("autor").value;
    let userDesc = document.getElementById("infoDibujo").value;
  
    localStorage.setItem("autor", userInput)
    localStorage.setItem("descripcion", userDesc)
    let autorRecibido = localStorage.getItem("autor");
    let descRecibida = localStorage.getItem("descripcion");
    // console.log( 'esto es descrecibida', descRecibida);
   console.log(autorRecibido);
   document.getElementById('infoAutor').innerHTML = autorRecibido;//borrar
   document.getElementById('infodesc').innerHTML=descRecibida;//borrar
   miarray[miarray.length]= autorRecibido; //areglo
  
   console.log(miarray);//arreglo



  }
  