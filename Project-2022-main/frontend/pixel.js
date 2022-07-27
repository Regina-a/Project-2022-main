const container = document.querySelector('.container');
const sizeE1 = document.querySelector('.size') //# pixeles
let size = sizeE1.value//valor del css del tamano de la cuadricula
const color = document.querySelector('.color')//color asignado
const resetbtn = document.querySelector('.btn')//limpie toda la cuadricula

let draw_ = false

//crea el grid de el numero yxy ejemplo  4x4
function populate(size){//size es de css
    container.style.setProperty('--size',size)//agrega la propiedad size del css y size asognado en el js
    for (let i = 0; i < size*size; i++) {//crea un ciclo for que genere los divs que represant la cuadricula
        const div = document.createElement('div');
        div.classList.add('pixel')

        div.addEventListener("mouseover", function() {
            if (!draw_) return 
            div.style.backgroundColor = color.value;
        })

        div.addEventListener("click", function() {
            div.style.backgroundColor = color.value;
        })

        container.appendChild(div)
    }

}
//esta dibujando
window.addEventListener("mousedown", function() {
    draw_ = true
})
//no esta dibujando
window.addEventListener("mouseup", function() {
    draw_ = false
})
 
function reset() {
    container.innerHTML= ''//valor vacio osea que no haya color en los divs (pixeles)
    populate(size)//caudricula
}

resetbtn.addEventListener("click", reset) //reseteo de colores de los pixeles
//cambio de tamano de la ciadricula
sizeE1.addEventListener("keyup", function(){
    size = sizeE1.value
    reset()
})
populate(size)

function crear() {
    alert('Your drawing has been uploaded to the gallery!')
    html2canvas(document.getElementById("contenido")).then(canvas => {
        // let imagen = document.getElementById("cuadrado")
        console.log(canvas);
        var anchor = document.createElement("a");
       anchor.href = canvas.toDataURL("image/png");
       let autorRecibido = localStorage.getItem("autor")//info del localStorage
        let descRecibida = localStorage.getItem("descripcion");
        console.log(descRecibida);
       console.log(anchor.href );
       document.body.appendChild(canvas)
       fetch('http://localhost:3000/guardarIMGPIXEL', {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        method: "POST",
        body:JSON.stringify({"img": canvas.toDataURL(),"nombre": autorRecibido, "descripcion": descRecibida})
    })
       
    });

  
}
let miarray = [];// arreglo

function saveDynamicDataToFile() {

    let userInput = document.getElementById("autor").value;
    let userDesc = document.getElementById("infoDesc").value;
  
    localStorage.setItem("autor", userInput)
    localStorage.setItem("descripcion", userDesc)
    let autorRecibido = localStorage.getItem("autor");
    let descRecibida = localStorage.getItem("descripcion");
    // console.log( 'esto es descrecibida', descRecibida);
   console.log(autorRecibido);
   console.log(descRecibida);
   document.getElementById('infoAutor').innerHTML = autorRecibido;//borrar
   document.getElementById('infodesc2').innerHTML= descRecibida;//borrar
   miarray[miarray.length]= autorRecibido; //areglo
  
   console.log(miarray);//arreglo



  }


