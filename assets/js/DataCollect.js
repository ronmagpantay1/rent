const car_order = document.querySelector('#collected-user-car-order');

//Saving Data to caroder
car_order.addEventListener('submit', (e) =>{
    e.preventDefault();
    // Clear GBorderID
    localStorage.setItem('orderID','')
    localStorage.setItem('carType','')
    
    // Take location
    let selectedCityLocation = document.getElementById("cityLocation")
    let cityLocation = selectedCityLocation.options[selectedCityLocation.selectedIndex].text;
    // Take car type
    let selectedCartype = document.getElementById("carType")
    let carType = selectedCartype.options[selectedCartype.selectedIndex].text;
    // Take pickup date
    let pickupDate = $('#startDate').datepicker({ dateFormat: 'dd,MM,yyyy'}).val();
    // console.log(typeof date)
    // Take return date
    let returnDate = $('#endDate').datepicker({ dateFormat: 'dd,MM,yyyy'}).val();
    // console.log(typeof date)
    // Take user ID and email
    let noDate = true
    if (pickupDate == "" && returnDate == ""){
        noDate = false
    }

    let user = auth.currentUser;
    if(user != null && noDate){
        userEmail = user.email;
        userUID = user.uid;
        
        db.collection('carOrder').add({
            pickupLocation : cityLocation,
        }).then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
            db.collection('carOrder').doc(docRef.id).set({
                pickupLocation : cityLocation,
                carType : carType,
                pickupDate : pickupDate,
                returnDate : returnDate,
                userEmail : userEmail,
                userID: userUID,
                orderID: docRef.id
            });
            passOrderID(docRef.id,carType,cityLocation,pickupDate,returnDate)
        }).then(() => 
            window.location.href="car-left-sidebar.html"
        )
    }else{
        if(!noDate){
            window.alert("Please choose date"); 
        }
        if(user == null){
            window.alert("Please Signin/ Signup");
        }
        console.log("check")
    }
})

function passOrderID(docRef,carType,cityLocation,pickupDate,returnDate) {
    localStorage.setItem('orderID',docRef)
    localStorage.setItem('carType',carType)
    localStorage.setItem('pickupLocation',cityLocation)
    localStorage.setItem('pickupDate',pickupDate)
    localStorage.setItem('returnDate',returnDate)
}