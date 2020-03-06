let mymap = L.map('map').setView([44.475962, -73.211882], 16)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap)

let popup = L.popup();

function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
}

mymap.on('click', onMapClick);


let path = window.location.pathname
let pathArray = path.split('/')
let id = pathArray.pop()
let name=document.getElementById('name')
let address=document.getElementById('address')
let phone=document.getElementById('phone')
let website=document.getElementById('webSite')
let hours=document.getElementById('hours')
let notes=document.getElementById('notes')


async function getRest(id) {
let restItem = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
	.then((response) => {
		return response.json()
	})
	.then((dataJson) => {
		return dataJson
	})

	restId.textContent += restItem.id
	name.textContent += restItem.name
	address.textContent += restItem.address
	  phone.textContent += restItem.phone
	webSite.textContent += restItem.webSite
	  hours.textContent += restItem.hours
	  notes.textContent += restItem.notes
}
getRest(id)


