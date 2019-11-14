const ADDRESS_ARRAY = [];
let MARKERA;
let MARKERB;
let POINTS = 5000;
let LATA;
let LNGA;
let LATB;
let LNGB;
let geocoder;


// ** 1
function playGame(){
    console.log("In Cha's file")
    let play = document.getElementById('play');
    play.addEventListener('click', (ev) => {
        ev.preventDefault();
        document.getElementById('map').style.display = 'inline';
        initMap();
        createButtons();
    })
}

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
      });
    google.maps.event.addListener(map, 'click', function(event) {
            let latitude = event.latLng.lat();
            let longitude = event.latLng.lng();
            initialize();
            codeLatLng(latitude, longitude);
            placeMarker(event.latLng);
    });
}
function placeMarker(location) {
    if(MARKERA){
        MARKERA.setPosition(location);
    } else {
        MARKERA = new google.maps.Marker({
            position: location, 
            map: map
        });
    }

    if(MARKERB){
        MARKERB.setPosition(MARKERB.position);
    } else {
        MARKERB = new google.maps.Marker({
            position: {
                // ** DAN's DATA
                lat: 4.7,
                lng: -74
            },
            map: map
        })
    }
}

function eventListenersTo(){
    let skip = document.getElementById('skip-button');
    skip.addEventListener('click', (ev) => {
        ev.preventDefault();
        showNextImage();
    })
    let submit = document.getElementById('submit-button');
    submit.addEventListener('click', (ev) => {
        ev.preventDefault();
        compareCoordinates();
    })
}

// ** ADDRESS
function initialize() {
    geocoder = new google.maps.Geocoder();
}
  
function codeLatLng(lat, lng) {
    let latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({
        'latLng': latlng
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
            let address = results[1].formatted_address;
            ADDRESS_ARRAY.push(address);
            LATA = lat;
            LNGA = lng;
        } 
        }
    });
}

function showNextImage(){
    console.log("Showing next image...");
}

function compareCoordinates(){
    let answerDiv = document.getElementById('answer');
    let answer = document.createElement('p');
    answer.textContent = "Your guess is in " + ADDRESS_ARRAY[ADDRESS_ARRAY.length - 1];
    answerDiv.appendChild(answer);
    console.log(MARKERA.position.lat(), MARKERA.position.lng());
    console.log(MARKERB.position.lat(), MARKERB.position.lng());

    //Get the lat and lng from the random image and the user input
    //Find the distance between both of them
    // Obtain the distance in meters by the computeDistanceBetween method
    // From the Google Maps extension
    
    // function calcDistance () {
    //     return google.maps.geometry.spherical.computeDistanceBetweeen(latlng1,latlng2)
    // }
    // calcDistance();
    
    // let distanceInMeters = geometryObject.computeDistanceBetween({
    //     from: latlng1,
    //     to: latlng2
    // });

    //console.log(distanceInMeters)

// Outputs: Distance in Meters:  286562.7470149898
//console.log("Distance in Meters: ", distanceInMeters);

// Outputs: Distance in Kilometers:  286.5627470149898
//console.log("Distance in Kilometers: ", (distanceInMeters * 0.001));
    //There is a maximum of 5000 points
    //The maximum points gets halved if the distance between the two points is 500


}
