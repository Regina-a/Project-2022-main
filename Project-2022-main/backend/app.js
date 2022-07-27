const express = require('express')
let cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
var fs = require('fs')
const { Console } = require('console')

app.use(cors())
const port = 3000


app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000 }));
//Recibe del forntend la url y la Pone en la terminal 
app.post('/guardarIMG', (req, res) => {
  let fileContent = req.body.img//link del canvas
  let autor = req.body.nombre//nombre del autor
  let desc = req.body.descripcion //descripcion del dibujo
// console.log('esto es el autor',desc)
 

  var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");//remplaza del link original del canvas la priemra parte por un espacio vacio
 
  //descripcion
  require("fs").writeFile('mydesc.txt', desc, 'utf8', function (err) {
    console.log(err);

  });
  //autor
  require("fs").writeFile('myAuthor.txt', autor, 'utf8', function (err) {
    console.log(err);

  });
  //imagen
  require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
    console.log(err);

  });
//imagen
let date = new Date().getMilliseconds();

  let pathSave = "C:/Users/Alive User/Desktop/images/img" + date + ".txt";
  fs.writeFile(pathSave, fileContent, err => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully");
    }
  });
  //autor
  let dateAutor = new Date().getMilliseconds();
  let pathAuthor = "C:/Users/Alive User/Desktop/txtAutor/nombre"+ dateAutor + ".txt"
  fs.writeFile(pathAuthor, autor, err => {
    if (err)
      console.log(err);
    else {
      console.log("Author name written successfully");
    }
  });
// descripcion
let dateDesc = new Date().getMilliseconds();
  let pathDesc = "C:/Users/Alive User/Desktop/TxtDesc/descripcion" + dateDesc + ".txt";
  fs.writeFile(pathDesc, desc, err => {
    if (err)
      console.log(err);
    else {
      console.log("Description written successfully");
    }
  });
  res.send({
    frase: ' EL AUTOR POR AMOR A DIOOOOOOS',
    autor: autor
  })
})
//HASTA AQUI GUARDA LA IMAGEN



app.get('/leerImagenes', (req, res) => {
//img
  const dirname = 'C:/Users/Alive User/Desktop/images/'//lugar donde se guardan los files
  let directorio = fs.readdirSync(dirname)//leer el directorio lo que esta dentro de  los archivos
  console.log('dierctorio leido', directorio);
  var data = [];//arreglo donde se mete el contenido extraido del directorio(carpeta), donde estan los archivos
//autor
  const dirnameAutor ='C:/Users/Alive User/Desktop/txtAutor/'
  let direcAutor = fs.readdirSync(dirnameAutor);
  var dataAutor =[];
//descrip
const dirnameDesc ='C:/Users/Alive User/Desktop/TxtDesc/'
let direcDesc = fs.readdirSync(dirnameDesc);
var dataDesc =[];

////////////////////////////////////////////////////////

//descrip
function onFileContentDesc(filename, content3) {
  console.log('CONTEEEEENT')
 dataDesc.push(content3);
 console.log(dataDesc.length);
}
// //  descrip
direcDesc.forEach(function (filename) {
console.log('actual', filename)   
  
  let content = fs.readFileSync(dirnameDesc + filename,{encoding: 'utf8'} )
    
     onFileContentDesc(filename, content);
    
   });

  //autor
  function onFileContentAutor(filename, content2) {
    console.log('CONTEEEEENT')
   dataAutor.push(content2);
   console.log(dataAutor.length);
  }
   //autor
 direcAutor.forEach(function (filename) {
  console.log('actual', filename)   
    
    let content = fs.readFileSync(dirnameAutor + filename,{encoding: 'utf8'} )
      
       onFileContentAutor(filename, content);
      
     });

  //imagen
 function onFileContent(filename, content) {
  console.log('CONTEEEEENT')
 data.push(content);
 console.log(data.length);
}
 
//imagen
      directorio.forEach(function (filename) {
     console.log('actual', filename)   
      
       let content = fs.readFileSync(dirname + filename,{encoding: 'utf8'} )
        
          onFileContent(filename, content);
         
        });
    console.log('data =(',data);
  
  res.send({
  // frase: 'Hello World!!!'
  archivosDesc: dataDesc,
  cantidadDesc: dataDesc.length,
  archivosAutor: dataAutor, 
  cantidadAutor: dataAutor.length,
  archivos: data, 
  cantidadImagenes: data.length
  
  })
});


//----------------------------------------------------------------------------------------------------------------
//PIXEL
app.post('/guardarIMGPIXEL', (req, res) => {
  console.log(req.body)
  let fileContent = req.body.img//link img
  let autor = req.body.nombre//nombre del autor
  let desc = req.body.descripcion //descripcion del dibujo
  console.log( 'esto es la desc',desc);
  let path = "imag.jpg"
  var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");//link img modificado

  //imagen
  require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
    console.log(err);

  });
//autor
require("fs").writeFile('myAuthor.txt', autor, 'utf8', function (err) {
  console.log(err);

});
//descripcion
require("fs").writeFile('mydesc.txt', desc, 'utf8', function (err) {
  console.log(err);

});
/////////////////////////////////////////////////

//imagen
  let date = new Date().getMilliseconds();
  let pathSave = "C:/Users/Alive User/Desktop/imagesPixel/img" + date + ".txt";
  // Guardar con un búfer como contenido de una imagen base64
  fs.writeFile(pathSave, fileContent, err => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully");
      console.log("The written has the following contents:");
      //console.log(fs.readFileSync("books.txt", "utf8"));
    }
  });

//autor
let dateAutor = new Date().getMilliseconds();
  let pathAuthor = "C:/Users/Alive User/Desktop/txtAutorPixel/nombre"+ dateAutor + ".txt"
  fs.writeFile(pathAuthor, autor, err => {
    if (err)
      console.log(err);
    else {
      console.log("Author name written successfully");
    }
  });

//descripcion
  let dateDesc = new Date().getMilliseconds();
  let pathDesc = "C:/Users/Alive User/Desktop/TxtDescPixel/descripcion" + dateDesc + ".txt";
  fs.writeFile(pathDesc, desc, err => {
    if (err)
      console.log(err);
    else {
      console.log("Description written successfully");
    }
  });

  
  res.send({
    frase: 'Hello World!!!',
    autor: autor
  })
}) 


//HASTA AQUI GUARDA IMG, AUTOR Y DESCRIPCION

app.get('/leerImagenesPixel', (req, res) => {
  //IMG
  const dirname = 'C:/Users/Alive User/Desktop/imagesPixel/'
  let directorio = fs.readdirSync(dirname)
  console.log('dierctorio leido', directorio);
  var data = [];
//autor
const dirnameAutor ='C:/Users/Alive User/Desktop/txtAutorPixel/'
let direcAutor = fs.readdirSync(dirnameAutor);
var dataAutor =[];
//descripcion
const dirnameDesc ='C:/Users/Alive User/Desktop/TxtDescPixel/'
let direcDesc = fs.readdirSync(dirnameDesc);
var dataDesc =[];

///////////////////////////////////////////////////////////////////

//imagen
 function onFileContent(filename, content) {
  console.log('CONTEEEEENT')
 data.push(content);
 console.log(data.length);
}
 //imagen
      directorio.forEach(function (filename) {
     console.log('actual', filename)   
     
       let content = fs.readFileSync(dirname + filename,{encoding: 'utf8'} )
         
          onFileContent(filename, content);
         
        });

//autor
function onFileContentAutor(filename, content2) {
  console.log('CONTEEEEENT')
 dataAutor.push(content2);
 console.log(dataAutor.length);
}
 //autor
direcAutor.forEach(function (filename) {
console.log('actual', filename)   
  
  let content = fs.readFileSync(dirnameAutor + filename,{encoding: 'utf8'} )
    
     onFileContentAutor(filename, content);
    
   });
//descripcion
function onFileContentDesc(filename, content3) {
  console.log('CONTEEEEENT')
 dataDesc.push(content3);
 console.log(dataDesc.length);
}
// descripcion
direcDesc.forEach(function (filename) {
console.log('actual', filename)   
  
  let content = fs.readFileSync(dirnameDesc + filename,{encoding: 'utf8'} )
    
     onFileContentDesc(filename, content);
    
   });

    console.log('data =(',data);
 

// Enviar data o mostrar data de forma asincrona para evitar enviar el arreglo vaccio
  // console.log(data)
  res.send({
  // frase: 'Hello World!!!'
  archivosDesc: dataDesc,
  cantidadDesc: dataDesc.length,
  archivosAutor: dataAutor, 
  cantidadAutor: dataAutor.length,
  archivos: data, 
  cantidadImagenes: data.length
  })
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

