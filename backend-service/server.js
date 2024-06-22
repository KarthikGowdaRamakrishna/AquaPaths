var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
require('dotenv').config()


var port = process.env.PORT || 8080;

try {
    mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors('*'));
    app.use('/public', express.static('public'));
    app.use(express.static(__dirname + "/public"));
    require("./app/routes/index")(app);
    app.listen(port);
    console.log(`App started at port ${port}`);
}

catch(error){
    console.error(error)
}

try {
    mongoose.connection.on('open', function (err) {
        console.log("database connection open success");
    });
}
catch (err) {
    console.error(err)
}


// mongoose.connection.on('open', function (err) {
//     if (err) {
//         console.log("database error");
//         console.log(err);
//     } else {
//     }
// }); 

exports = module.exports = app;
