const {fetchWeatherApi} = require('openmeteo')



const  getWeatherService = async (latitude,longitude,parameters) =>{
    const params = {
        "latitude": 54.544587,
        "longitude": 10.227487,
        // "hourly": ["wave_height"]
    };
    const url = "https://marine-api.open-meteo.com/v1/marine";
    const responses = await fetchWeatherApi(url, params);
    return responses
}



module.exports = {
    getWeatherService
}
