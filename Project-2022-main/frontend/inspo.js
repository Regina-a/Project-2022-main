let arrayInspoBasico = ["Sheep","Blood","Car","Papaya","Wolf","Foot","Blackberry","Doctor","Lady","Turtle","Obama","Saturn","Vinegar","Wolf" ,"Shoe","Penguin"]
function response() {
    var aleatorio=Math.floor((Math.random()*arrayInspoBasico.length));
        document.getElementById("respuesta").innerHTML=arrayInspoBasico[aleatorio]
}

let arrayImages = ["https://i.pinimg.com/564x/d4/5e/ed/d45eedc852f228774c23c33894970fc7.jpg","https://i.pinimg.com/564x/49/fc/e4/49fce47f1b1cbe66cb07c0fd8980acf3.jpg",'https://i.pinimg.com/564x/e2/b6/0d/e2b60dde99735d33ed07ba09c34ce078.jpg','https://i.pinimg.com/564x/7d/4b/63/7d4b6399fdd8e37134849366de4f42e5.jpg','https://i.pinimg.com/474x/c4/b0/37/c4b037a1bc9884f8e990496efca27b3d.jpg','https://i.pinimg.com/474x/37/82/95/378295210f202384831780d301a801bb.jpg','https://i.pinimg.com/474x/c3/da/e6/c3dae69a595cae882f25757a2a979b86.jpg']

// console.log("kachyz")
function images() {
   
}
console.log(images)

function images2() { var aleatorio = Math.floor(Math.random()*arrayImages.length);
    //document.getElementById("imagen").innerHTML=arrayImages [aleatorio]
    let newIMG = document.getElementById("image1")
            newIMG.src = arrayImages[aleatorio]
         //  let lugar = document.getElementById('imagen')
           //lugar.append(newIMG)
           newIMG.classList.add("canva", "size")
         
        }
let array = ['Penguin','Cactus','Girl','Taco','Moon','Star','Sheep','Quesadilla','Bike','Policeman','Sunflower','Koala','Chair','Chocolate bar','Clown']
let verbo = ['drinking juice', 'dying','running','training','dancing','singing','programming','cooking', 'gossiping with Facundo','jumping','eating', 'partying', 'sleeping', 'bleeding']
let predicado = ['in the bed','in the pool', 'in the hair salon','at school','at the train station','at walmart', 'in mars', 'in a plane','in Wonderland','on the beach', 'in the middle of nowhere','in Michoacan', 'at the Supermaket']

function oracion(){
    var sujeto =Math.floor((Math.random()*array.length));
    var verb =Math.floor((Math.random()*verbo.length));
    var predi =Math.floor((Math.random()*predicado.length));
    document.getElementById("oracion").innerHTML=array[sujeto]+' '+verbo[verb]+' '+predicado[predi]
}