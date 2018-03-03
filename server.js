//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Port
var PORT = process.env.PORT || 3000;

//Express
var app = express();

//Static Files
app.use(express.static("public"));

//Parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Routing
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

//Listening
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
