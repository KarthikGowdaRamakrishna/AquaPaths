const fs = require('fs');
const {LOOKUP} = require("../../static/lookup");

function readAndTransformGeoJSON(filePath) {
    try {
        const geojson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const transformedData = [];
        const searchData = [];

        geojson.features.forEach(feature => {
            const country = feature.properties.Country;
            const locode = feature.properties.LOCODE;
            const name = feature.properties.NameWoDiac;
            const status = feature.properties.Status;
            const coordinates = feature.geometry.coordinates;
            transformedData.push({
                [LOOKUP?.PORT_DATA?.COUNTRY]: country,
                [LOOKUP?.PORT_DATA?.LOCODE]: locode,
                [LOOKUP?.PORT_DATA?.NAME]: name,
                [LOOKUP?.PORT_DATA?.STATUS]: status,
                [LOOKUP?.PORT_DATA?.COORDINATES]: coordinates,
            });
            searchData.push(LOOKUP?.SPECIAL_CHARACTERS?.OPENING_BRACKET + locode + LOOKUP?.SPECIAL_CHARACTERS?.CLOSING_BRACKET + LOOKUP?.SPECIAL_CHARACTERS?.SPACE + name)
        });
        return {transformedData,searchData};
    } catch (error) {
        console.error('Error reading or transforming GeoJSON file:', error);
        return null;
    }
}

module.exports = {readAndTransformGeoJSON};
