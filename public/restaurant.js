let path = window.location.pathname
let pathArray = path.split('/')
let id = pathArray.pop()
//let restId = document.getElementById('id')
let name = document.getElementById('name')
let address = document.getElementById('address')
let phone = document.getElementById('phone')
let website = document.getElementById('webSite')
let hours = document.getElementById('hours')
let notes = document.getElementById('notes')
let noteContainer = document.getElementById('noteList')

async function getRest(id) {
	let restItem = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
		.then((response) => {
			return response.json()
		})
		.then((dataJson) => {
			return dataJson
		})

	restId.textContent = restItem.id
	name.textContent = restItem.name
	address.textContent = restItem.address
	phone.textContent = restItem.phone
	webSite.textContent = restItem.website
	hours.textContent = restItem.hours
	


	restItem.notes.forEach(element => {
		noteContainer.innerHTML += `<li>${element}</li>`
	});
	

	getLatLon(restItem.address, restItem.website, restItem.name)
	console.log(restItem.notes)

}

getRest(id)

async function getLatLon(address, website, name) {
	let pinLocation = await fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
		.then((data) => {
			return data.json()
		})
		.then((locationInfo) => {
			let info = locationInfo[0]
			let lat = info.lat
			let lon = info.lon
			let restWeb = website

			let mymap = L.map('map').setView([lat, lon], 16)

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(mymap)

			let thisPin = L.marker([lat, lon]).addTo(mymap).bindPopup('Click to go to ' + name + ' website').openPopup()

			// popup on hover
			// thisPin.on('mouseover', () => {
			// 	thisPin.openPopup()
			// })
			//When moving mouse off pin, close content
			// thisPin.on('mouseout', () => {
			// 	thisPin.closePopup()
			// })
			thisPin.on('click', () => {
				window.open(restWeb);
			});
		})
}



