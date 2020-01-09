window.addEventListener('load', () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.location-timezone');
	let temperatureSection = document.querySelector('.temperature-degree');
	let temperatureSpan = document.querySelector('.temperature span');


	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = 'https://cors-anywhere.herokuapp.com/'
			const api = `${proxy}https://api.darksky.net/forecast/1375af5e029e8ae2e530d615f99da203/${lat},${long}`
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					const {temperature, summary, icon} = data.currently;

					// set DOM text
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					// formula for celcius
					let celcius = (temperature-32)*(5/9);

					// set Icons
					getIcons(icon, document.querySelector('.icon'));

					// change fareheit to celsius
					if(temperatureSpan.textContent === 'F'){
						temperatureSpan.textContent = 'C';
						temperatureSection.textContent = Math.floor(celcius);
					}else{
						temperatureSpan.textContent = 'F';
						temperatureSection.textContent = temperature;
					}
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