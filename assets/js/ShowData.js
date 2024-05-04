let carType = localStorage.getItem('carType')
let orderID = localStorage.getItem('orderID')

// get data
switch (carType){
    case 'Sedan':
        db.collection('sedanID').get().then(snapshot =>{
            setupList(snapshot.docs)
        });
        break;
    case 'Truck':
        db.collection('truckID').get().then(snapshot =>{
            setupList(snapshot.docs)
        });
        break;
    case 'SUV':
        db.collection('suvID').get().then(snapshot =>{
            setupList(snapshot.docs)
        });
        break; 
}

function myFunction(elem) {
    //console.log(elem.id)
    carPickID = elem.id;
    localStorage.setItem('carPickID',carPickID)
    localStorage.setItem('orderID',orderID)
    localStorage.setItem('carType',carType)
}

var list = document.getElementById('carList')
list.addEventListener('click', function(evt){
    evt.preventDefault();
    console.log(carPickID)
    console.log('DA TOI DAY ROI DEO BIET SAO K DI NUA')
    window.location.href = "car-details.html";
})


const carList = document.querySelector('.car-list-content')
// Setup List
const setupList = (data) =>{
    // Clear GBorderID
    localStorage.setItem('carPickID','')
    let html = '';
    data.forEach(doc =>{
        const guide = doc.data()
        const li = `
            <div class="single-car-wrap">
                <div class="row">
                    <!-- Single Car Thumbnail -->
                    <div class="col-lg-5">
                        <div class="car-list-thumb"><img src="${guide.img}"></div>
                    </div>
                    <!-- Single Car Thumbnail -->

                    <!-- Single Car Info -->
                    <div class="col-lg-7">
                        <div class="display-table">
                            <div class="display-table-cell">
                                <form class="car-list-info">
                                    <h2><a href="#"> ${guide.brand} ${guide.name}</a></h2>
                                    <h5>39$ Rent /per a day</h5>
                                    <p>Vivamus eget nibh. Etiam cursus leo vel metus. Nulla facilisi. Aenean inorci luctus et ultrices posuere cubilia.</p>
                                    <ul class="car-info-list">
                                        <li>Air Condition</li>
                                        <li>Diesel</li>
                                        <li>Auto</li>
                                    </ul>
                                    <p class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star unmark"></i>
                                    </p>
                                    <button  onclick="myFunction(this)" id="${guide.carID}" class="rent-btn" >Book It</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- Single Car info -->
                </div>
            </div>
        `;
        html += li
    });
    carList.innerHTML = html;
}

