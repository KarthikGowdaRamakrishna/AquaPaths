const userRoute = require("./userRoute");
const seaRoute = require("./seaRoute");
const portRoute = require("./portRoute");
const weatherRoute = require("./weatherRoute");
const newsRoute = require("./newsRoute");


module.exports = function (app) {
    app.use("/sea", seaRoute);
    app.use("/port",portRoute);
    app.use("/news",newsRoute);
    app.use("/weather",weatherRoute);
    app.use("/user", userRoute);
  };