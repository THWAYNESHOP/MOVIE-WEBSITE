// Check login state
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("video-section").style.display = "block";
    document.getElementById("login-section").style.display = "none";
    console.log("Welcome,", user.email);
  } else {
    document.getElementById("video-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
  }
});

// Login
function login(event) {
  if (event) event.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => console.log("Logged in!"))
    .catch(err => alert(err.message));
}

// Logout
function logout() {
  auth.signOut()
    .then(() => console.log("Logged out!"))
    .catch(err => alert(err.message));
}
