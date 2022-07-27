//let body = document.getElementById('bodyID')
function mostrar() {
  let spiner = document.getElementById("spinner1")
  spiner.classList.remove("mostrar")

  
  console.log('si me ejecuto mostrar');
    fetch('http://localhost:3000/leerImagenes')
    .then(response => response.json())
    .then(data => {
      console.log(data);
           data.archivos.forEach((item, index) => {
              // document.getElementById("cargando").innerText = ''
            spiner.classList.add("mostrar")

               let newIMG = document.createElement("img");
               newIMG.src = item
              let lugar = document.getElementById('container')
              lugar.append(newIMG)
              newIMG.classList.add("canva", "size", "existentIMG")
              ///nuevo
             
              newIMG.onclick = function(){
               let modalImg = document.getElementById('img01')//imagen
               let nombre = document.getElementById("nombreAutor")//autor
               let infoD = document.getElementById('descInfo')//descripcion dibujo

               modal.style.display = "block";
               modalImg.src = item;//imagen
               nombre.innerHTML = data.archivosAutor[index];//autor
               infoD.innerHTML = data.archivosDesc[index];//descripcion
              //  console.log('esto es',data.archivosDesc[index]);
               modalImg.classList.add('sizing');
              }
               
               //create element
               //source sera item pq item es el link que recibo del back
              });
       });
    
  
   }
   var modal = document.getElementById("myModal");

   function mostrarPixel() {
     console.log('si me ejecuto mostrarPixel');
     
 
    fetch('http://localhost:3000/leerImagenesPixel')
    .then(response => response.json())
    
    .then(data => {
   console.log(data);
        data.archivos.forEach((item, index) => {
            let newIMG = document.createElement("img");
            
            newIMG.src = item
           let lugar = document.getElementById('container')
           lugar.append(newIMG)
           newIMG.classList.add("canva", "size", "existentIMG")
           ///nuevo
          
           newIMG.onclick = function(){
            let modalImg = document.getElementById('img01')
            let nombre = document.getElementById("nombreAutor")//autor
               let infoD = document.getElementById('descInfo')//descripcion dibujo

            modal.style.display = "block";
            modalImg.src = item;//source sera item pq item es el link que recibo del back
            nombre.innerHTML = data.archivosAutor[index];//autor
            infoD.innerHTML = data.archivosDesc[index];//descripcion
            modalImg.classList.add('sizing')

           }
            
            
            
           });
    });
  }

     var span = document.getElementsByClassName("close")[0];

     // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
       modal.style.display = "none";
     }

    

   window.addEventListener("load", mostrar)

   window.addEventListener("load", mostrarPixel)

  
   
