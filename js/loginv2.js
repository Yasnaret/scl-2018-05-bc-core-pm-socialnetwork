
// funcion para Ingresar con usuario y contraseña ya hecho el registro
function signIn(){
    let email1=document.getElementById("email1").value;
    let password1=document.getElementById("password1").value;
    firebase.auth().signInWithEmailAndPassword(email1, password1)
  .then(function(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        window.location.href = '';
      }
    });
  })
   .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
}

function signInWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // // The signed-in user info.
        var user = result.user;
        firebase.database().ref('users/' + user.uid).set({
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            profilePhoto: user.photoURL
          }).then(user => {
            window.location.href = 'main.html';
          });
       
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log (error)
      });
}

function signInWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      }).then(user => {
        window.location.href = 'main.html';
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}




function sendPasswordResetEmail(){
let email1=document.getElementById("email1").value;
let auth = firebase.auth();
let  emailAddress =email1;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}

//(funcionalidad boostrap&jquery)
$(function() {
    $('[data-toggle="popover"]').popover();
  });

  $('.popover-dismiss').popover({
    trigger: 'focus'
  });
