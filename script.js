const input = document.getElementById('city-input');
const search_button = document.getElementById('city-search');
const auto_button = document.getElementById('auto-weather');

const city_location = document.getElementById('city-details');
const local_time = document.getElementById('local-time');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const icon = document.getElementById('icon');

async function getData(city_location) {
    let data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=2b590cdc4f154003bce73446242309&q=${city_location}&aqi=yes`
    );
    return await data.json();
}

search_button.addEventListener("click", async () => {
   try{
    const val = input.value;
    const result = await getData(val);
    city_location.innerText = `${result.location.name}, ${result.location.country}`;
    local_time.innerText = `${result.location.localtime} (24-hr)`;
    temperature.innerText = `${result.current.temp_c} \u00B0 C`;
    condition.innerText = `${result.current.condition.text}`
    icon.setAttribute("src", `${result.current.condition.icon}`);
    const isDaytime = result.current.is_day;
    changeBackground(result.current.condition.text, isDaytime);
   }

   catch (error) {
    alert("Location not found");
   } 
   
});

async function getData(lat, long) {
    let data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=2b590cdc4f154003bce73446242309&q=${lat},${long}&aqi=yes`
    );
    return await data.json();
}

async function gotLocation(position) {
    const res = await getData(
        position.coords.latitude,
        position.coords.longitude
    )
    try{
    let result = res;
    city_location.innerText = `${result.location.name}, ${result.location.country}`;
    local_time.innerText = `${result.location.localtime} (24-hr)`;
    temperature.innerText = `${result.current.temp_c} \u00B0 C`;
    condition.innerText = `${result.current.condition.text}`
    icon.setAttribute("src", `${result.current.condition.icon}`);
    const isDaytime = result.current.is_day;
    changeBackground(result.current.condition.text, isDaytime);
   }

   catch (error) {
    alert("Location not found");
   }
}

function failedToGet(){
    alert("Location permission not granted");
}

auto_button.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(gotLocation,failedToGet);
});


function changeBackground(condition, isDaytime) {
    const container = document.getElementById("container");
    const body = document.body;
    let backgroundImage;

    if (isDaytime) {
        if (condition.includes('sunny')) {
            backgroundImage = 'url("images/sunny-day.jpg")';
        } else if (condition.includes('rain')) {
            backgroundImage = 'url("images/rainy-day.jpg")';
        } else {
            backgroundImage = 'url("images/cloudy-day.jpg")';
        }
    } else {
        if (condition.includes('rain')) {
            backgroundImage = 'url("images/rainy-night.jpeg")';
        } else {
            backgroundImage = 'url("images/cloudy-night.jpg")';
        }
    }

    body.style.backgroundImage = backgroundImage;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
}


