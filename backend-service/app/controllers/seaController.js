const sdk = require('api')('@searoutes-docs/v2.0#336s9hc37lnvvag61');
require('dotenv').config()
const SavedLocation = require('../models/savedLocation');

const getRoute = async (req, res) => {
    const origin = req.body.srcCoordinate[0].toString() + ',' + req.body.srcCoordinate[1].toString();
    const dest = req.body.destCoordinate[0].toString() + ',' + req.body.destCoordinate[1].toString();
    const allowPanama = req.body.allowPanama;
    const allowSuez = req.body.allowSuez;
    const srcCode = req.body.srcCode;
    const destCode = req.body.destCode;
    const carrierId = '21';
    const nContainers = '1';

    const blockAreas = []
    if (!allowPanama) {
        blockAreas.push(11112)
    }
    if (!allowSuez) {
        blockAreas.push(11117)
    }
    console.log(blockAreas)
        const allowIceCaps = req.body.allowIceCaps;
        const coordinates = origin + ';' + dest;
        sdk.auth(process.env.SEA_ROUTES);
        try {
            // Fetch route data
            const { data: routeData } = await sdk.getPlanSeaRoute({
                allowIceAreas: allowIceCaps.toString(),
                avoidHRA: 'false',
                avoidSeca: 'false',
                blockAreas: blockAreas,
                coordinates: coordinates
            });

            if (routeData?.status === 404) {
                return res.status(404).send({
                    status: 404,
                    success: false,
                    noRoute: true,
                    message: "No Route Found between Origin and Destination"
                });
            }

            let weatherData = null;
            try {
                const { data: fetchedWeatherData } = await sdk.postWeather(routeData);
                weatherData = fetchedWeatherData;
            } catch (weatherErr) {
                console.error("Failed to fetch weather data:", weatherErr);
            }

            let co2TenderData = null;
            try {
                const { data: fetchedCO2TenderData } = await sdk.getCO2Tender({
                    fromLocode: srcCode,
                    toLocode: destCode,
                    carrierId: '21',
                    nContainers: '1'
                });
                co2TenderData = fetchedCO2TenderData;
            } catch (co2TenderErr) {
                console.error("Failed to fetch CO2 tender data:", co2TenderErr);
            }

            return res.status(200).send({
                status: 200,
                success: true,
                noRoute: false,
                data: routeData,
                weatherData: weatherData,
                co2TenderData: co2TenderData
            });
        } catch (err) {
            // Handle errors
            console.error("An error occurred while processing the request:", err);
            return res.status(500).send({
                status: 500,
                success: false,
                message: "An error occurred while processing your request."
            });
        }
    };


    const savePath = (req, res) => {
        const srcCoordinates = req.body?.srcCoordinate;
        const destCoordinates = req?.body?.destCoordinate;
        const path = req?.body?.path;
        const waypoints = req?.body?.waypoints;
    }

    module.exports = {
        getRoute
    };
