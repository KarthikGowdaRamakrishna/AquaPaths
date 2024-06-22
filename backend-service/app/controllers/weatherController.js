const { getWeatherService } = require("../Services/weatherService");
const getWeather = async (req, res) => {

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const parameters = req.body.parameters;

    const resultWeather = await getWeatherService(latitude, longitude, parameters);

    if (resultWeather.length > 0) {
        res.send({
            status: 200,
            success: true,
            message: "Data received Successfully",
            data: resultWeather
        })
    }
    else {
        res.send({
            status: 200,
            success: false,
            message: "Data not found",
        })
    }
}


module.exports = {
    getWeather
}