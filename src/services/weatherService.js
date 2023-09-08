import { DateTime } from "luxon";

const API_KEY = 'df04a6426eb8c9305ebb65c9deb52f35';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

//weather?q={city name}&appid={API key}';

// https://api.openweathermap.org/data/3.0/onecall?
//lat={lat}&lon={lon}&exclude={part}&appid={API key}
const getWeatherData = (infoType,searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

   
    return fetch(url).then((res) => res.json())
    }

const formatCurrentWeather = (data) => {
const {
    coord: {lat, lon},
     main: {temp, feels_like, temp_min, temp_max,humidity},
     name,
     dt,
     sys:{country, sunrise, sunset},
     weather,
     wind: {speed}
} = data

const {main: details, icon} = weather[0]

return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, 
name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastWeather = (data) => {
    let { timezone, daily} = data;
    daily = daily.slice(1,6).map(d => {               //daily 2 forecast //
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    }); 

   /* hourly = hourly.slice(1,6).map(d => {                   // hourly 1 forecast //
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });  */
    return {timezone, daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData
    ('weather', searchParams).then(formatCurrentWeather);
    
    const {lat, lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat, lon, exclude: 'current,minutely,alerts', units: searchParams.units
    }).then(formatForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = (
secs,
zone,
format = "ccc, dd LLL yyyy' | Local time: 'h:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


export default getFormattedWeatherData;