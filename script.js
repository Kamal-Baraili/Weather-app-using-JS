const input = document.getElementById('city-input');
const search_button = document.getElementById('city-search');
const auto_button = document.getElementById('auto-weather');

const remove_contents = document.getElementById('remove');
const city_location = document.getElementById('city-details');
const local_time = document.getElementById('local-time');
const temperature = document.getElementById('temperature');
const condition = document.getElementById('condition');
const icon = document.getElementById('icon');
const degree = document.getElementById('degree');

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
    remove_contents.remove();
    city_location.innerText = `${result.location.name}, ${result.location.country}`;
    local_time.innerText = `${result.location.localtime}`.replaceAll("-","/");
    temperature.innerText = `${result.current.temp_c}`;
    degree.innerText = " \u00B0 C";
    condition.innerText = `${result.current.condition.text}`
    icon.setAttribute("src", `${result.current.condition.icon}`);
    icon.style.height = "120px";
    icon.style.width = "120px";
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
    remove_contents.remove();
    city_location.innerText = `${result.location.name}, ${result.location.country}`;
    local_time.innerText = `${result.location.localtime}`.replaceAll("-","/");
    temperature.innerText = `${result.current.temp_c}`;
    degree.innerText = " \u00B0 C";
    condition.innerText = `${result.current.condition.text}`
    icon.setAttribute("src", `${result.current.condition.icon}`);
    icon.style.height = "120px";
    icon.style.width = "120px";
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
        if (condition.includes('Sunny')) {
            backgroundImage = 'url("images/sunny-day.jpg")';
        } else if (condition.includes('Clear')) {
            backgroundImage = 'url("images/clear-day.jpg")';
        }else if (condition.includes('rain')) {
            backgroundImage = 'url("images/rainy-day.jpg")';
        } else {
            backgroundImage = 'url("images/cloudy-day.jpg")';
        }
    } else {
        if (condition.includes('rain')) {
            backgroundImage = 'url("images/rainy-night.jpg")';
        } else if(condition.includes('Clear')){
            backgroundImage = 'url("images/clear-night.jpg")';
        } else {
            backgroundImage = 'url("images/cloudy-night.jpg")';
        }
    }

    body.style.backgroundImage = backgroundImage;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
}


