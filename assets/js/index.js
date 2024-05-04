const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedUserInfor = document.querySelectorAll('.user-loggedin')


auth.onAuthStateChanged(user => {
    if(user){
        console.log('User logged in', user)
        setupUI(user)
        
        var user1 = auth.currentUser;

        if (user1 != null){
            email = user1.email; 
            console.log(email)
            document.getElementById("userEmailShow").innerHTML = email;
        }
    } else {
        console.log('User loggod out');
        setupUI()
        document.getElementById("userEmailShow").innerHTML = "Hello Guess"    
    }
});


const setupUI = (user) => {
    if(user){
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
        loggedUserInfor.forEach(item => item.style.display = 'block')
    
    }else {
        // Toggle UI elements
        loggedOutLinks.forEach(item => item.style.display = 'block');
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedUserInfor.forEach(item => item.style.display = 'block')
    }
}

// Show user Email
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})

