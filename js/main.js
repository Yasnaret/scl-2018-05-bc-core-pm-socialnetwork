 // Deslogearse
  function signOutClose(){
    firebase.auth().signOut()
    .then(function (){
        console.log('Cerrando Sesion...')
        window.location.href = 'index.html';
    })
    .catch(error=>{
        console.log(error)
    })
}


// -----------------------------------------------

//rescata elemento contenedor 
const listaMensajes = document.getElementById("post");
const listaComentarios = document.getElementById("comentarios");

// Ejecución eventos
function eventListeners(){
    //Post
    //cuando se envia el formulario
    document.getElementById("comparte").addEventListener("click", agregarPublicacion);
    //Borrar post
    document.addEventListener("click", borrarPublicacion);
    // Contenido cargado
    document.addEventListener("DOMContentLoaded", localStorageListo); 

    //Comentarios
    //Cuando se envían comentarios
    document.getElementById("comenta").addEventListener("click", agergarComentarios);
    //Borrar comentarios
    document.addEventListener("click", borrarComentario);
    //Cargar comentarios
    document.addEventListener("DOMContentLoaded", localStorageComentariosListo);

}
eventListeners();

// Funciones
// Generar elementos del DOM
function generarDom(post){
    //Crear elementos post
  const itemPost = document.createElement("div");
  const parrafo = document.createElement("p");
  const textPost = document.createTextNode(post);
  const botonBorrar = document.createElement("button");
  const textBoton = document.createTextNode("X");
  const heart = document.createElement("button"); 
  const light = document.createElement("button");
  const lemon = document.createElement("button");

 // Añadir atributos a elementos del Post
  itemPost.setAttribute("class", "col-12")
  parrafo.setAttribute("class", "d-inline-block")
  botonBorrar.setAttribute("class", "btn btn-dark"); 
  heart.classList.add("style", "fas", "fa-hand-holding-heart");  
  light.classList.add("style", "far", "fa-lightbulb"); 
  lemon.classList.add("style", "far", "fa-lemon");
 
  // añade texto al botón del post
  botonBorrar.appendChild(textBoton);
  // añade el mensaje al parrafo
  parrafo.appendChild(textPost);
  // añade mensaje a la lista
  itemPost.appendChild(parrafo);
  // añade el botón de borrar al mensaje
  itemPost.appendChild(botonBorrar);
  //añade boton de hoja
  itemPost.appendChild(heart);
  //añade boton de chinita
  itemPost.appendChild(light);
  //añade boton de limon
  itemPost.appendChild(lemon);
  // añade item con mensaje y botón a contendor padre
  listaMensajes.appendChild(itemPost); 

   //Se crea evento para iconos
    heart.addEventListener("click", ()=>{
      heart.classList.toggle("red");
    });
    light.addEventListener("click", ()=>{
    light.classList.toggle("yellow");
    });
    lemon.addEventListener("click", ()=>{
    lemon.classList.toggle("green");
    });
  
}

// Generar elementos del DOM
function generarDomComentarios(comentario){
 //Crear elementos comentarios
  const itemComment = document.createElement("div");
  const commentP = document.createElement("p");
  const textComment = document.createTextNode(comentario);
  const borrarComment = document.createElement("button");
  const textBtnComment = document.createTextNode("x"); 

  //Añadir atributos a elementos del comentario
  itemComment.setAttribute("class", "col-8")
  commentP.setAttribute("class", "d-inline-block")
  borrarComment.setAttribute("class", "btn btn-red");

  
 //añade texto al boton de commentarios
 borrarComment.appendChild(textBtnComment);
 //añade el comenatario al parrafo
 commentP.appendChild(textComment);
 //añade comentarios a la lista
 itemComment.appendChild(commentP);
 // añade el boton de borrar comentario
 itemComment.appendChild(borrarComment);
 //añade item con comentarios y boton a contenedor padre
 listaComentarios.appendChild(itemComment); 
}


// añadir post al documento
function agregarPublicacion(){
    if((document.getElementById("cajaPost").value === "")) {
        alert("no puedes dejar campos vacíos")
      } else{
        // leer el valor de textarea
    const posts = document.getElementById("cajaPost").value;
    // crear elementos en el DOM
    generarDom(posts)
    // añadir a Local Storage
    agregarPostsLocalStorage(posts);
      }
     
} 
//Añadir comentarios al post
function agergarComentarios(){
    if((document.getElementById('cajaComentario').value === '')) {
        alert('no puedes dejar campos vacíos')
      } else{
    //leer el valor del textarea
    const comentarios = document.getElementById("cajaComentario").value;
    //crea elementos en el DOM
    generarDomComentarios(comentarios)
    //Añadir a Local Storage
    agregarComentariosLocalStorage(comentarios);
      }
} 


//eliminar post del DOM
function borrarPublicacion(e) {
  if(e.target.className === "btn btn-dark"){
      e.target.parentElement.remove();
      borrarPostsLocalStorage(e.target.parentElement.innerText);
  }
} 
//Eliminar comentarios del DOM
 function borrarComentario(e){
    if(e.target.className === "btn btn-red"){
        e.target.parentElement.remove();
        borrarComentarioLocalStorage(e.target.parentElement.innerText);
    }
} 


// mostrar datos de LocalStorage en la pagina
function localStorageListo(){
    let posts;
    posts = obtenerPostLocalStorage();
    posts.forEach(function(post){
        generarDom(post);
    });
} 
//Mostrar datos de LocalStorage comentarios en la pagina
function localStorageComentariosListo(){
    let comentarios;
    comentarios = obtenerComentariosLocalStorage();
    comentarios.forEach(function(comentario){
        generarDomComentarios(comentario)
    });
}  


// agrega mensaje a local storage
function agregarPostsLocalStorage(textoMsj){
    let posts = obtenerPostLocalStorage();
    // añadir mensaje al arreglo
    posts.push(textoMsj);
    // convierte arreglo a string para añadir a local storage
    localStorage.setItem("posts",JSON.stringify(posts));
} 
//Agrega comentarios a LocalStorage
function agregarComentariosLocalStorage(textoCmmnt){
    let comentarios = obtenerComentariosLocalStorage();
    //añadir comentario al arreglo
    comentarios.push(textoCmmnt);
    //convierte arreglo a string para añadir a LocalStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
}


// comprobar elementos en local storage y retorne arreglo
function obtenerPostLocalStorage() {
   let posts;
   // revisamos valores de local storage
   if(localStorage.getItem("posts") === null) {
       posts = [];
   }else{
       posts = JSON.parse(localStorage.getItem("posts"))
   }    
   return posts;
} 
//comprobar elemntos en LocalStorage y retorne arreglo
 function obtenerComentariosLocalStorage(){
    let comentarios;
    //revisamos valores de LocalStorage
    if(localStorage.getItem("comentarios") === null){
        comentarios = [];
    }else{
        comentarios = JSON.parse(localStorage.getItem("comentarios"))
    }
    return comentarios;
}


// eliminar mensajes de local storage
function borrarPostsLocalStorage(post) {
    //elimina la X del mensaje
    //la funcion recibe todo el texto del mensaje más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
    let borrarPost = post.substring(0, post.length - 1);
    let posts = obtenerPostLocalStorage();
    //en el forEach, compara el mensaje recibido con lo existente en local storage y quita la tarea a eliminar
    posts.forEach(function(textoArr, index){
        if(borrarPost === textoArr) {
            posts.splice(index, 1);
        }
    })
    //convierte el areglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
   localStorage.setItem("posts", JSON.stringify(posts)); 
} 
//Eliminar comentarios LocalStorage
 function borrarComentarioLocalStorage(comentario){
    //Elimina la x del comentario
    //la función recibe todo el texto del comentarios más la x y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del Localstorage
    let borrarComment = comentario.substring(0, comentario.length - 1);
    let comentarios = obtenerComentariosLocalStorage();
    //en el forEach compara el comentario recibido con lo existente en local storage y quita el comentario a eliminar
    comentarios.forEach(function(textoArr, index){
        if(borrarComment === textoArr){
            comentarios.splice(index, 1);
        }
    })
    //Convierte el arreglo nuevo(con el comentario eliminado) en un string para volver a guardarlo en localStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
} 

