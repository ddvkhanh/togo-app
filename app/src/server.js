const expresss = require("express");
const app = express(); //create the app with express
const mongoose = require("mongoose");
const morgan = require("morgan"); //log requests to the console (express4)
const methodOverride = require("method-override"); //simulate DELETE and PUT (express4)
const database = require("./api/config/database");
const port = process.env.PORT || 8888;

mongoose.connect(database.url);

app.use(expresss.static(__dirname + "/public"));
app.use(morgan("dev")); //log every request to the console
app.use(express.urlencoded({ extended: "true" })); //parse the URL-encoded bodies
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(methodOverride());

require("./public/routes.js.js")(app);

app.listen(port);
console.log("App listening on port: " + port);
