const {readAndTransformGeoJSON} = require('../Services/portServices');

const filePath = './static/attributed_ports.geojson';


const getPortData = (req,res) =>{
    const geojsonData = readAndTransformGeoJSON(filePath);
    if (geojsonData) {
        res.send({
            status:200,
            success:true,
            message:"Data Retrived successfully",
            portData:geojsonData
        })
    } else {
        res.send({
            status:200,
            success:false,
            message:"Data Retrive Failed",
        })
    }
}
module.exports = {getPortData}

