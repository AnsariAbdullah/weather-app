window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');


	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;
			console.log(long, lat);
			const proxy = 'https://cors-anywhere.herokuapp.com/'
			const api = `${proxy}https://api.darksky.net/forecast/1375af5e029e8ae2e530d615f99da203/${lat},${long}`
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					const {temperature, summary, icon} = data.currently;

					// set DOM text
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					// set Icons
					getIcons(icon, document.querySelector('.icon'));
				})
		})
	}

	function getIcons(icon, iconID){
		const skycons = new Skycons({color:"white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});