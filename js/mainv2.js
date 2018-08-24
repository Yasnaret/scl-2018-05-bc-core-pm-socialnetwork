//  // Get a reference to the database service
// let database = firebase.database();
// let ref=database.ref('users');
// ref.on('value',gotData,errorData);

//.................................................................Mostrando datos de usuario actual.

let profileImage=document.getElementById('imagenDePerfil');
function inicializarFirebase(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        
        let userPhoto=user.photoURL
        profileImage.setAttribute('src', userPhoto);
      }
    })
}

inicializarFirebase()

// //mostrar data de los usuarios activos
// function gotData(data){
//   let user=data.val()
 
//   console.log(user)
// }
// function errorData(error){
//   console.log(error)
// }

// // para leer los datos 
// function observadorMain(){
//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log ("Existe usuario activo")
//   // User is signed in.
//       var name = users
//       var email = user.email;
//       var photoURL = user.photoURL;
    
//       console.log(user);
//       //username.textContent(name);
//       //userEmail.textContent(email);
//       //profilePhoto.setAttribute('src', photoUrl);
//   }
//   });
// }
// observadorMain();

// firebase......................................................................

  let textArea = document.getElementById('write-posts');
  let postBtn = document.getElementById('posts-btn');
  let postsContainer = document.getElementById('posts-container');
  let uploadMessage = document.getElementById('upload-msg');
  let file = document.getElementById('file');
  let postsRef = firebase.database().ref('posts');
  let postedImagesRef = firebase.database().ref().child('postedImages');
  let imageUrl = null;

  // Asociando eventos
  textArea.addEventListener('input', enablePostBtn);
  file.addEventListener('change', enablePostBtn);
  file.addEventListener('change', selectImage);
  postBtn.addEventListener('click', sharePost);
   

  // Previniendo que el formulario se envie (que no refresque la página)
  // document.getElementById('create-post').submit(function() {
  //   return false;
  // });

  // Agregar una imagen a Firebase Storage
  function selectImage(e) {
    let selectedFile = e.target.files[0];
    console.log(selectedFile.name);

    let storageRef = firebase.storage().ref('postedImages/' + selectedFile.name);
    let uploadTask = storageRef.put(selectedFile);
    console.log ("leyo esto despues de upñoadtask")

    uploadTask.on('state_changed', function(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      
      uploadMessage.innerHTML=('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>' + progress + '%</span>');
      switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      let downloadURL = uploadTask.snapshot.downloadURL;
      console.log('subió imagen');
      uploadMessage.classList.add('text-success');
      uploadMessage.innerHTML=('<i class="fa fa-check" aria-hidden="true"></i> <span>100%</span>');
      console.log(downloadURL);
      imageUrl = downloadURL;
    });
  }

  // Publicar un post
  function enablePostBtn() {
    if (textArea.value && textArea.value !== ' ' || file.value) {
    
      postBtn.removeAttribute('disabled');
      
    } else {
      postBtn.setAttribute('disabled', true);
    }
  }
  
  function sharePost() {
    console.log(textArea.value)
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (textArea.value !== ' ' || file.value) {
          let uid = firebase.database().ref().child('posts').push().key;

          textArea.focus();
          postBtn.setAttribute('disabled', true);
          uploadMessage.classList.remove('text-success');
          uploadMessage.innerHTML='';
  
           let newPost = {
            name: user.displayName,
            message: textArea.value,
            image: imageUrl,
            uid: uid
          };
  
          firebase.database().ref('posts/').push(newPost);
        }
      }
      textArea.value='';
      file.value='';
    });
  }
postsRef.on('child_added', function(snapshot) {
    let htmlPost = '';
    let element = snapshot.value;
    let namePost = element.name;
    let messagePost = element.message;
    let imagePost = element.image;
    let idPost = element.uid;
    
    if (imagePost !== undefined && imagePost !== null) {
      console.log(imagePost);
      htmlPost = '<div id="' + idPost + '" class="card del-post mt-3"><div class="card-header bg-yellowLab white-text"><small>Publicado por</small> <span>' + namePost + '</span> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div id="' + idPost + '"class="card-body"><p class="card-text">' + messagePost + '</p><div class="new-post rounded-corners"><img class="w-100" src="' + imagePost + '"></div></div><div class="card-footer"><button class="btn btn-secondary like-btn rounded-corners"><i class="fa fa-heart-o" aria-hidden="true"></i></button><button class="btn btn-secondary rounded-corners ml-2"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button></div></div>';
    } else {
      htmlPost = '<div id="' + idPost + '" class="card del-post mt-3"><div class="card-header bg-yellowLab white-text"><small>Publicado por</small> <span>' + namePost + '</span> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div id="' + idPost + '"class="card-body"><p class="card-text">' + messagePost + '</p></div><div class="card-footer"><button class="btn btn-secondary like-btn rounded-corners"><i class="fa fa-heart-o" aria-hidden="true"></i></button><button class="btn btn-secondary rounded-corners ml-2"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button></div></div>';
    }
   
    postsContainer.insertBefore(htmlPost,postsContainer.firstChild);
  });

 // Deslogearse
 function signOutClose(){
  firebase.auth().signOut()
  .then(function (){
      console.log('Cerrando Sesion...')
      window.location.href = 'loginv2.html';
  })
  .catch(error=>{
      console.log(error)
  })
}