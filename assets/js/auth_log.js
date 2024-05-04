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

//Login
const loginForm = document.querySelector("#login-form1");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get user infor
    const email_log = loginForm['login-email'].value; 
    const password_log = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email_log, password_log).then(cred => {
        loginForm.reset()  
        loginForm.querySelector('.error').innerHTML = '';
        window.location.href = "index.html"
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
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


//logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})