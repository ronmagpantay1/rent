let carPickID = localStorage.getItem('carPickID')
let carType = localStorage.getItem('carType')
let orderID = localStorage.getItem('orderID')
let pickupLocation = localStorage.getItem('pickupLocation')
let pickupDate = localStorage.getItem('pickupDate')
let returnDate = localStorage.getItem('returnDate')


// console.log("carPick: ", carPickID)
// console.log("carType: ", carType)
// console.log("orderID: ", orderID)


var carBrandCheckOut 
var carImgCheckOut


const carThumbNailCheckout = document.getElementById('.carThumbnail')

switch (carType){
    case 'Sedan':
        carSeachCheckOut = db.collection("sedanID")
        break;
    case 'Truck':
        carSeachCheckOut = db.collection("truckID")
        break;
    case 'SUV':
        carSeachCheckOut = db.collection("suvID")
        break; 
}


var queryCarCheckout = carSeachCheckOut.where('carID','==',carPickID)
                                        .get()
                                        .then(function (querySnapshot) {
                                            querySnapshot.forEach(function (doc) {
                                                const carData = doc.data()
                                                document.querySelector('#carName').innerHTML = carData.brand + " " +carData.name;
                                                document.querySelector('#carThumb').innerHTML = `<div><img src="${carData.img}" alt="JSOFT"></div>`;
                                            })
                                        })
                                        .catch(function(error){
                                            console.log("Error getting documents: ", error);
                                        });

const carComfirmed = document.querySelector('#comfirmed');

carComfirmed.addEventListener('click',(e) =>{
    e.preventDefault();
    let user = auth.currentUser;
    userEmail = user.email;
    userUID = user.uid;

    // console.log(userEmail);
    // console.log(userUID);

    db.collection('carPicked').add({
        pickupLocation : pickupLocation,
        }).then(function(docRef) {
            // console.log("Document written with ID: ", docRef.id);
            db.collection('carPicked').doc(docRef.id).set({
                pickupLocation : pickupLocation,
                carType : carType,
                pickupDate : pickupDate,
                returnDate : returnDate,
                userEmail : userEmail,
                userID: userUID,
                orderID: orderID,
                carPickID : carPickID
            });
        }).then(() => 
            window.location.href="index.html"
        )
    
})
