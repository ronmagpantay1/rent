// Listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in', user)
        setupUI(user)
    } else {
        console.log('User loggod out');
        setupUI()
    }
});

//Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user infor
    const email = signupForm['signup-email'].value; 
    const password = signupForm['signup-password'].value;

    //Signup User
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signupForm.reset()
        signupForm.querySelector('.error').innerHTML = '';
        window.location.href = "index.html"
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

function googleLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    });
};

const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})