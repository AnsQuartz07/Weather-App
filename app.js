//get the longitude and latitude
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let sunriseTime = document.querySelector(".sunrise-time");
    let sunsetTime = document.querySelector(".sunset-time");
    const temperatureSpan = document.querySelector(".temperature span");
    const iconElement = document.querySelector(".weather-icon");

    const key = "f49b178aececdff9e38b880bb1363943";
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //proxy = "http://cors-anywhere.herokuapp.com/";
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
            
        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data =>{
           console.log(data);
           const { temp } = data.main;
           const { name } = data;
           const { country } = data.sys;
           const { description, icon } = data.weather[0];
           //const { icon } = ;
           temperatureDegree.textContent = Math.floor(temp-273.81);
           locationTimezone.textContent = `${name},${country}`;
           // set icons
           temperatureDescription.textContent = description;
           iconElement.innerHTML = `<img src="icons/${icon}.png"/>`;
           // celcius Formula
           let celsius = temp - 273.81;
           let Fahrenheit = 32 + celsius*(9/5);

           temperatureSection.addEventListener("click", () =>{
               if(temperatureSpan.textContent === "°F"){
                temperatureSpan.textContent = "°C";
                //console.log(cel);
                temperatureDegree.textContent = Math.floor(celsius);
               }else{
                temperatureSpan.textContent = "°F";
                //let Farenhite = temperature;
                temperatureDegree.textContent = Math.floor(Fahrenheit);
               }
           }) 
           // sunrise
           var rise = data.sys.sunrise;
           var date1 = new Date(rise * 1000);
           var rise_time = date1.toLocaleTimeString();
           sunriseTime.textContent = rise_time;
           // sunset
           var set = data.sys.sunset;
           var date2 = new Date(set * 1000);
           var set_time = date2.toLocaleTimeString();
           sunsetTime.textContent = set_time;
        });
    });
    }
});
