//Set Up Leaflet Map, centered on Burlington VT
let myMap = L.map('restaurant-map').setView([44.4774, -73.2121], 16);
let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

//Make a container for the list of restaurant names
let restListContainer = document.getElementById('restaurant-list');
async function getRests() {
  let restList = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      return jsonObj;
    });

  //Make a list of all restaurant names
  restList.forEach(rest => {
    let restId = rest.id;
    let restName = rest.name;
    restListContainer.innerHTML += `<li><a href="restaurant/${restId}">${restName}</a></li>`;
  });

  //Get address for every restaurant
  restList.forEach(rest => {
    let restName = rest.name;
    let restAddress = rest.address;

    //Place Marker based on restaurant address and on hover give restaurant name
    placeRestMarkers(restAddress, restName);
  });

}

//Set Pin on Map, with name, and on click will go to separate page
function placeRestMarkers(restAddress, restName, restId) {
  //Get restaurant lat, lon from address
  fetch(`https://nominatim.openstreetmap.org/search/?q=${restAddress}&format=json`)
    .then(response => {
      return response.json();
    })
    .then(jsonObj => {
      let info = jsonObj[0];
      let lat = info.lat;
      let lon = info.lon;
      //Place pin based on lat, lon
      let thisMarker = L.marker([lat, lon])
        .addTo(myMap)
        .bindPopup(restName);
      //When putting mouse on pin, open up content
      thisMarker.on('mouseover', () => {
        thisMarker.openPopup();
      });
      //When moving mouse off pin, close content
      thisMarker.on('mouseout', () => {
        thisMarker.closePopup();
      });
      //When clicking on pin, go to page
      thisMarker.on('click', () => {
        window.location = `/restaurant/:${restId}`;
      });
    });
}

getRests();