function weatherSearch() {
    place = place1.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=5b4bee0ba241d092159faf007e166080`).then(out => out.json())
        .then(out => displayData(out))
}
function getInfo(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5b4bee0ba241d092159faf007e166080`).then(out => out.json())
        .then(out => displayData(out))
}
function currentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getInfo);
    }
    else {
        alert("Geolocation is not supported by this browser.")
    }
}
function displayData(dataArray) {
    locationName=dataArray.name
    main = dataArray.weather[0].main
    icon = dataArray.weather[0].icon
    temp= Math.floor((dataArray.main.temp-273.15)*10)/10
    tempMin= Math.floor((dataArray.main.temp_min-273.15)*10)/10
    tempMax= Math.floor((dataArray.main.temp_max-273.15)*10)/10
    tempFeelslike= Math.floor((dataArray.main.feels_like-273.15)*10)/10
    windSpeed=Math.floor(dataArray.wind.speed*3.6)
    arrowSize=Math.floor(50*windSpeed/30)
    arrowAngle=dataArray.wind.deg
    humidity=dataArray.main.humidity
    clouds=dataArray.clouds.all
    visibility=dataArray.visibility



    weatherDisplay.innerHTML=main
    locationDisplay.innerHTML=locationName
    
    temp1.innerHTML=temp+'°C'
    tempmin1.innerHTML=tempMin+'°C'
    tempmax1.innerHTML=tempMax+'°C'
    tempfeel1.innerHTML=tempFeelslike+'°C'
    iconDisplay.innerHTML =`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`

    humidity1.innerHTML=humidity+'%'
    wind1.innerHTML=`${windSpeed}km/h &nbsp <i class="fa-solid fa-arrow-down" style="font-size:${arrowSize}px;transform:rotate(${arrowAngle}deg)"></i>`
    cloud1.innerHTML=clouds+'%'
    visib1.innerHTML=visibility+'m'

    // console.log(dataArray.dt<dataArray.sys.sunrise || dataArray.dt>dataArray.sys.sunset);
    if(dataArray.dt<dataArray.sys.sunrise || dataArray.dt>dataArray.sys.sunset){
        dayNight.innerHTML=`
        body{
            background-color: rgb(166, 159, 201);
        }
        `
    }
    else{
        dayNight.innerHTML=''
    }


}