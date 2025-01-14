// 🛑 Replace with your Firebase Config.  


// Firebase Config
var firebaseConfig = {
 apiKey: "AIzaSyDIdSpACQbc1-_JICLQ6gRjl_YrX25eiOA",
  authDomain: "mini-diary-organization.firebaseapp.com",
  databaseURL: "https://mini-diary-organization-default-rtdb.firebaseio.com",
  projectId: "mini-diary-organization",
  storageBucket: "mini-diary-organization.appspot.com",
  messagingSenderId: "542075449644",
  appId: "1:542075449644:web:26133a6448c78f79927c89",
  measurementId: "G-26RQZMG8W6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



// -------------------------------------
// Upload Multiple Images
// -------------------------------------

function uploadMultipleImages(e) {
  let files = e.target.files;

  for (const file of files) {
    firebase
      .app()
      .storage()
      .ref('images')
      .child(file.name)
      .put(file);
  }
}

// -------------------------------------
// Get All The Images
// -------------------------------------
function getAllImages() {

  firebase
    .storage()
    .ref('images')
    .listAll()
    .then(snap => {
      snap.items.forEach(itemRef => {
        itemRef.getDownloadURL().then(imgUrl => {
          console.log(imgUrl)
        });
      })
    })
}
// getAllImages()

// -------------------------------------
// Upload A Single Image
// -------------------------------------

function uploadImage(e) {
  let file = e.target.files[0];

  firebase
    .app()
    .storage()
    .ref('images')
    .child(file.name)
    .put(file);
}


// -------------------------------------
// Get An Image
// -------------------------------------
function getAnImage() {

  firebase
    .storage()
    .ref('images')
    .child(yourimagefilename)
    .getDownloadURL()
    .then(imgUrl => {
      console.log(imgUrl);
    });
}

// -------------------------------------
// Upload Profile Picture With Authentication
// -------------------------------------

// DOM Elements
const email = document.getElementById('email'),
  pword = document.getElementById('pword'),
  fileUploader = document.getElementById('fileUploader'),
  img = document.getElementById('img')

// Data
let file = {};

// File Uploaded Change Event
fileUploader.addEventListener('change', function (e) {
  file = e.target.files[0];
})


// Signup User
function signUpUser() {
  firebase.auth().createUserWithEmailAndPassword(email.value, pword.value).then(auth => {

    // Upload A Profile Image to the Cloud Storage
    firebase
      .storage()
      .ref("users")
      .child(auth.user.uid + "/profile.jpg")
      .put(file);

  }).catch(error => {
    console.log(error.message)
  })
}

// Check to see if a user is logged in or not
firebase.auth().onAuthStateChanged(user => {

  if (user) {

    // Get A Profile Image from the Cloud Storage
    firebase
      .storage()
      .ref("users")
      .child(user.uid + "/profile.jpg")
      .getDownloadURL()
      .then(imgUrl => {
        img.src = imgUrl;
      });
  }
})
