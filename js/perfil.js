let database = firebase.database();
let userProfilePhoto=document.getElementById('profile-photo');
let userProfileName=document.getElementById('displayUsername');
let userProfileEmail=document.getElementById('displayEmail');

// // Returns the signed-in user's profile Pic URL.
// function getProfilePicUrl() {
//     return firebase.auth().currentUser.photoURL;
    
//     // return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
//   }
  
//   // Returns the signed-in user's display name.
//   function getUserName() {
//     return firebase.auth().currentUser.displayName;
//   }

function inicializarFirebase(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        let displayName=user.displayName;
        let userPhoto=user.photoURL
        let userEmail=user.email
        userProfileName.textContent=displayName;
        
        userProfileEmail.textContent=userEmail;
        userProfilePhoto.setAttribute('src', userPhoto);
      }
    })
}

inicializarFirebase()
